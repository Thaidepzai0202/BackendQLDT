const Student = require('../models/student.model');


const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findOneAndUpdate({ mssv: id }, req.body);
        if (!student) {
            return res.status(404).json({ message: "Student not Found" });
        }
        const updateStudent = await Student.find({ mssv: id });
        res.status(200).json({ updateStudent });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginStudent = async (req, res) => {
    try {
        const { mssv, password } = req.body;
        const student = await Student.findOne({ mssv: mssv });
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