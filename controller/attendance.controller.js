const Attendance = require('../models/attendance.model');
const Student = require('../models/student.model');
const ClassRoom = require('../models/class.model');
// const { updatePoint } = require('./class_content.controller');

const addAttendance = async (req, res) => {
    try {
        const attendance = req.body;
        const check = await Attendance.findOne({ mssv: attendance.mssv, classID: attendance.classID });
        if (!check) {
            const attendance2 = await Attendance.create(attendance);
            return res.status(200).json(attendance2);
        }
        return res.status(400).json({ message: "Existed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAttendanceInClass = async (req, res) => {
    try {
        const { classID } = req.params;
        const list = [];
        const listAttendance = await Attendance.find({ classID: classID });
        for (let index = 0; index < listAttendance.length; index++) {
            const element = listAttendance[index];
            const checkNameStudent = await Student.findOne({ mssv: element.mssv });

            const attendWithName = {
                ...element.toObject(),
                name: checkNameStudent.name
            }
            list.push(attendWithName);
        }

        return res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAttendanceInClass = async (req, res) => {
    try {
        const { classID } = req.params;
        const update = req.body;

        const checkClassID = await ClassRoom.findOne({ classID: classID });
        if (!checkClassID) {
            return res.status(401).json({ message: "Not found Class" });
        }
        const updatePromise = update.map(element => {
            return Attendance.findOneAndUpdate({ mssv: element.mssv, classID: classID }, element);
        });

        await Promise.all(updatePromise);

        const result = await Attendance.find({ classID: classID });
        return res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLockClass = async (req, res) => {
    try {
        const { classID } = req.params;
        const result = await Attendance.find({ classID: classID });
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
        const { lock } = req.body;

        // console.log("classID:", classID);
        // console.log("lock value:", lock);

        const result = await Attendance.updateMany(
            { classID: classID },
            { $set: { lock: lock } }
        );

        // console.log("Update result:", result);

        // Tìm lại tất cả các đối tượng đã cập nhật để trả về phản hồi
        // const updatedResult = await Attendance.find({ classID: classID });
        // console.log("Updated records:", updatedResult);

        return res.status(200).json({lock : lock});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    addAttendance,
    getAttendanceInClass,
    updateAttendanceInClass,
    getLockClass,
    updateLockClass
}