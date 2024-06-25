const LeaveRequest = require('../models/leaverequests.model');
const Student = require('../models/student.model');
const ClassRoom = require('../models/class.model');



const addLeaveRequest = async (req, res) => {
    try {
        const leaverequest = req.body;
        const checkStudent = await Student.findOne({ where: { "mssv": leaverequest.mssv } });
        if (!checkStudent) {
            return res.status(410).json({ message: "Student not found" });
        }
        const checkClass = await ClassRoom.findOne({ where: { "classID": leaverequest.classID } });
        if (!checkClass) {
            return res.status(410).json({ message: "Class not found" });
        }

        const addLR = await LeaveRequest.create(leaverequest);
        return res.status(200).json(addLR);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getListLRInClass = async (req, res) => {
    try {
        const { id } = req.params;
        const checkClass = await ClassRoom.findOne({ where: { "classID": id } });
        if (!checkClass) {
            return res.status(410).json({ message: "Class not found" });
        }
        const listLRInClass = await LeaveRequest.findAll({ where: { "classID": id } });
        res.status(200).json(listLRInClass);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getListLRStudent = async (req, res) => {
    try {
        const { classID ,mssv } = req.body;
        const checkClass = await ClassRoom.findOne({ where: { "classID": classID } });
        if (!checkClass) {
            return res.status(410).json({ message: "Class not found" });
        }
        const listLRInClass = await LeaveRequest.findAll({ where: { "mssv": mssv , "classID" : classID} });
        res.status(200).json(listLRInClass);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addLeaveRequest,
    getListLRInClass,
    getListLRStudent
}