const ClassContent = require('../models/class_content.model');
const Subject = require('../models/subject.model');
const ClassRoom = require('../models/class.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');


const getClassContents = async (req, res) => {
    try {
        const classContents = await ClassContent.findAll();
        res.status(200).json(classContents);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const showListStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const classContents = await ClassContent.findAll({ where: { classID: id } });

        // Tạo một danh sách các promises để xử lý việc tìm kiếm Student
        const promises = classContents.map(async (room) => {
            const roomObj = room.get({ plain: true }); // Chuyển đổi đối tượng Sequelize thành plain object
            roomObj.dataStudent = await Student.findOne({ where: { mssv: room.mssv } });
            return roomObj;
        });

        // Đợi tất cả các promises hoàn thành
        const result = await Promise.all(promises);

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getClassContent = async (req, res) => {
    try {
        const { id } = req.params;

        // Bước 1: Tìm tất cả các bản ghi trong ClassContent với mssv bằng id
        const classContents = await ClassContent.findAll({ where: { mssv: id } });

        // Bước 2: Lấy danh sách các classID từ kết quả tìm kiếm
        const classIDs = classContents.map(content => content.classID);

        // Bước 3: Tìm các ClassRoom với các classID đã lấy
        const classRooms = await ClassRoom.findAll({ where: { classID: classIDs } });

        // Bước 4: Thêm thông tin về Subject và Teacher vào các ClassRoom
        const classRoomPromises = classRooms.map(async (classRoom) => {
            const classRoomObj = classRoom.get({ plain: true }); // Chuyển đổi đối tượng Sequelize thành plain object
            classRoomObj.dataSubject = await Subject.findOne({ where: { subjectID: classRoom.subjectID } });
            classRoomObj.dataTeacher = await Teacher.findOne({ where: { mscb: classRoom.mscb } });
            return classRoomObj;
        });

        const classRoom2s = await Promise.all(classRoomPromises);

        // Bước 5: Trả về danh sách các ClassRoom với thông tin đầy đủ
        res.status(200).json(classRoom2s);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const addListStudent = async (req, res) => {
    try {
        const bodyContent = req.body;
        const checkClass = await ClassRoom.findOne({ where: { classID: bodyContent.classID } });
        if (!checkClass) {
            return res.status(404).json({ message: "Class ID not found" });
        }

        const promises = bodyContent.listMSSV.map(async (element) => {
            const checkStudent = await Student.findOne({ where: { mssv: element } });
            const checkStudentInClass = await ClassContent.findOne({ where: { mssv: element, classID: bodyContent.classID } });

            if (checkStudent && !checkStudentInClass) {
                const valueSave = {
                    mssv: element,
                    classID: bodyContent.classID
                };
                await ClassContent.create(valueSave);
            }
        });

        await Promise.all(promises);

        return res.status(200).json({ message: "okeList" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addClassContent = async (req, res) => {
    try {
        const classContent1 = req.body;
        let isBusyStudent = false;
        const classHaved = await ClassContent.findOne({ "mssv": classContent1.mssv, "classID": classContent1.classID });
        if (classHaved) { return res.status(404).json({ message: "You haved this class" }) }
        const classCheck = await ClassRoom.findOne({ classID: classContent1.classID });
        const classContentCheck = await ClassContent.find({ mssv: classContent1.mssv });


        for (let room of classContentCheck) {
            const classChecks = await ClassRoom.findOne({ "classID": room.classID, });
            const str1 = classCheck.classSession;
            const str2 = classChecks.classSession;

            if (hasCommonNumber(str1, str2) && classChecks.dayOfWeek === classCheck.dayOfWeek) {
                return res.status(405).json({ message: "you haved ather class at this time" });
                // break;
            }
        }
        const classContent = await ClassContent.create(classContent1);
        return res.status(200).json(classContent);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updatePoint = async (req, res) => {
    try {
        const body = req.body;
        const [updated] = await ClassContent.update(body, {
            where: {
                mssv: body.mssv,
                classID: body.classID
            }
        });

        if (!updated) {
            return res.status(404).json({ message: "Student in class not Found" });
        }

        const updatedPoint = await ClassContent.findOne({
            where: {
                mssv: body.mssv,
                classID: body.classID
            }
        });

        res.status(200).json(updatedPoint);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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
    getClassContents,
    addClassContent,
    getClassContent,
    showListStudent,
    updatePoint,
    addListStudent
}