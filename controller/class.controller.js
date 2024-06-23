const ClassRoom = require('../models/class.model');
const Subject = require('../models/subject.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');


const getClassRooms = async (req, res) => {
    try {
        const classRooms = await ClassRoom.findAll();
        // const classRoomPromises = classRooms.map(async (ex) => {
        //     ex.dataSubject = await Subject.findOne({ "subjectID": ex.subjectID });
        //     ex.dataTeacher = await Teacher.findOne({ "mscb": ex.mscb });
        //     return ex;
        // });

        const classRoom2s = await Promise.all(classRooms);
        res.status(200).json(classRoom2s);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getClassRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const classRooms = await ClassRoom.findAll({where :{ "mscb": id }});
        const classRoomPromises = classRooms.map(async (ex) => {
            ex.dataSubject = await Subject.findOne({where :{ "subjectID": ex.subjectID }});
            return ex;
        });

        const classRoom2s = await Promise.all(classRoomPromises);
        res.status(200).json(classRoom2s);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateClassRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowsCount] = await ClassRoom.update(req.body, {
            where: { classID: id }
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "ClassRoom not Found" });
        }

        const updatedClassRoom = await ClassRoom.findOne({ where: { classID: id } });

        res.status(200).json(updatedClassRoom );

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addClassRoom = async (req, res) => {
    try {
        // const newClassRoom = await ClassRoom.create(req.body);
        // res.status(200).json(newClassRoom);


        const classRoom1 = req.body;
        const teacherCheck = await ClassRoom.findAll({ where: { mscb: classRoom1.mscb, dayOfWeek: classRoom1.dayOfWeek } });
        let isBusyTeacher = false;
        for (let room of teacherCheck) {
            if (hasCommonNumber(classRoom1.classSession, room.classSession)) {
                isBusyTeacher = true;
                break;
            }
        }
        const classRoomCheck = await ClassRoom.findAll({ where: { className: classRoom1.className, dayOfWeek: classRoom1.dayOfWeek } });
        let isBusy = false;
        for (let room of classRoomCheck) {
            if (hasCommonNumber(classRoom1.classSession, room.classSession)) {
                isBusy = true;
                break;
            }
        }

        if (isBusyTeacher) {
            return res.status(405).json({ message: "Teacher this day is busy" });
        } else if (isBusy) {
            return res.status(404).json({ message: "ClassRoom this day is busy" });

            // Tiếp tục logic khác nếu phòng học không bận
        } else {
            // classRoom1.semester = "20232";
            const classRoom = await ClassRoom.create(classRoom1);
            res.status(200).json(classRoom);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



function hasCommonNumber(str1, str2) {
    // Kiểm tra đầu vào để đảm bảo cả hai giá trị đều là chuỗi
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }
    // Tách các chuỗi thành các mảng số
    const arr1 = str1.split(',').map(Number);
    const arr2 = str2.split(',').map(Number);

    // Sử dụng một Set để kiểm tra nhanh
    const set1 = new Set(arr1);

    // Kiểm tra xem có số nào trong arr2 nằm trong set1 không
    for (let num of arr2) {
        if (set1.has(num)) {
            return true; // Có số chung
        }
    }

    return false; // Không có số chung
}



module.exports = {
    getClassRooms,
    updateClassRoom,
    addClassRoom,
    getClassRoom,
}