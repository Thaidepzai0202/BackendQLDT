const Student = require('../models/student.model');
const connection = require('../connect');
const { where } = require('sequelize');


const getStudents = async (req, res) => {
    try {
        const data = await Student.findAll();
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowsCount] = await Student.update(req.body, {
            where: { mssv: id }
        });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Student not Found" });
        }
        const updatedStudent = await Student.findOne({
            where: { mssv: id }
        });
        return res.status(200).json(updatedStudent);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addStudent = async (req, res) => {
    try {
        const student = req.body;
        if (!student.mssv || !student.name || !student.gender || !student.email || !student.password || !student.className || !student.course) {
            return res.status(501).json({ message: "Please provide all firelds" });
        }
        const checkExisted = await Student.findOne({ where: { mssv: student.mssv } });
        if (checkExisted) {
            return res.status(501).json({ message: "Mssv Existed" });
        }
        const success = await Student.create(student);
        return res.status(200).json(success);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////
const loginStudent = async (req, res) => {
    try {
        const { mssv, password } = req.body;
        const student = await Student.findOne({where : { mssv: mssv }});
        if (!student) {
            return res.status(404).json({ message: "Wrong mssv" });
        }

        if (password === student.password) {
            return res.status(200).json(student);
        }

        return res.status(404).json({ message: "Wrong password" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    getStudents,
    updateStudent,
    addStudent,
    loginStudent
}