const Attendance = require('../models/attendance.model');
const Student = require('../models/student.model');
const ClassRoom = require('../models/class.model');
// const { updatePoint } = require('./class_content.controller');

const addAttendance = async (req, res) => {
    try {
        const attendance = req.body;
        const check = await Attendance.findOne({ where: { mssv: attendance.mssv, classID: attendance.classID } });
        if (!check) {
            const attendance2 = await Attendance.create(attendance);
            return res.status(200).json(attendance2);
        }
        return res.status(400).json({ message: "Existed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAttendance = async (req, res) => {
    try {
        const attendance = req.body;
        const check = await Attendance.findOne({ where: { mssv: attendance.mssv, classID: attendance.classID } });
        if (check) {
            if (check.lock == 1) {
                let list = check.dataAttendance;
                list[13] = 1;
                check.dataAttendance = list;
                await check.save();
            }
            return res.status(200).json(check);
        }
        return res.status(400).json({ message: "STudent no found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAttendanceInClass = async (req, res) => {
    try {
        const { classID } = req.params;
        const list = [];

        // Tìm tất cả các bản ghi Attendance có classID tương ứng
        const listAttendance = await Attendance.findAll({ where: { classID: classID } });

        // Lặp qua từng bản ghi Attendance
        for (let index = 0; index < listAttendance.length; index++) {
            const element = listAttendance[index];

            // Tìm bản ghi Student tương ứng bằng mssv từ Attendance
            const checkNameStudent = await Student.findOne({ where: { mssv: element.mssv } });

            // Kiểm tra nếu dataAttendance là chuỗi, chuyển đổi thành mảng số
            let dataAttendance = element.dataAttendance;
            if (typeof dataAttendance === 'string') {
                dataAttendance = dataAttendance.split(',').map(Number);
            }

            // Tạo đối tượng với dữ liệu Attendance và tên học sinh
            const attendWithName = {
                id: element.id,
                classID: element.classID,
                mssv: element.mssv,
                lock: element.lock,
                dataAttendance: dataAttendance,
                name: checkNameStudent ? checkNameStudent.name : '' // Thêm tên học sinh nếu tìm thấy
            };

            list.push(attendWithName);
        }

        return res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateAttendanceInClass = async (req, res) => {
    try {
        const { classID } = req.params;
        const update = req.body;

        // Check if the classID exists in ClassRoom
        const checkClassID = await ClassRoom.findOne({ where: { classID: classID } });
        if (!checkClassID) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Update Attendance records
        const updatePromises = update.map(async (element) => {
            const [attendance, created] = await Attendance.findOrCreate({
                where: { mssv: element.mssv, classID: classID },
                defaults: element
            });

            if (!created) {
                await Attendance.update(element, {
                    where: { mssv: element.mssv, classID: classID }
                });
            }
        });

        await Promise.all(updatePromises);

        const result = await Attendance.findAll({ where: { classID: classID } });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const getLockClass = async (req, res) => {
    try {
        const { classID } = req.params;
        const result = await Attendance.findAll({ where: { classID: classID } });
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }
        return res.status(200).json({ lock: result[0].lock });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateLockClass = async (req, res) => {
    try {
        const { classID } = req.params;
        let { lock } = req.body;

        lock = parseInt(lock);

        // Validate lock value
        if (lock !== 0 && lock !== 1) {
            return res.status(400).json({ message: "Lock value must be either 0 or 1" });
        }

        // Update all Attendance records with matching classID
        const result = await Attendance.update(
            { lock: lock },
            { where: { classID: classID } }
        );


        return res.status(200).json({ lock: lock });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error.message });
    }
};





module.exports = {
    addAttendance,
    getAttendanceInClass,
    updateAttendanceInClass,
    getLockClass,
    updateLockClass,
    updateAttendance
}