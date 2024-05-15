const ClassRoom = require('../models/class.model');


const getClassRooms = async (req, res) => {
    try {
        const classRooms = await ClassRoom.find();
        res.status(200).json(classRooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateClassRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const classRoom = await ClassRoom.findOneAndUpdate({ classID: id }, req.body);
        if (!classRoom) {
            return res.status(404).json({ message: "ClassRoom not Found" });
        }
        const updateClassRoom = await ClassRoom.find({ classID: id });
        res.status(200).json({ updateClassRoom });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addClassRoom = async (req, res) => {
    try {
        const classRoom1 = req.body;
        const classRoomCheck = await ClassRoom.find({ className: classRoom1.className, dayOfWeek: classRoom1.dayOfWeek });
        let isBusy = false;
        for (let room of classRoomCheck) {
            if (hasCommonNumber(classRoom1.classSession, room.classSession)) {
                isBusy = true;
                break;
            }
        }

        if (isBusy) {
            return res.status(404).json({ message: "ClassRoom this day is busy" });

            // Tiếp tục logic khác nếu phòng học không bận
        } else {
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
    addClassRoom
}