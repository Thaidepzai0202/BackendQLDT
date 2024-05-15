const Teacher = require('../models/teacher.model');
const Student = require('../models/teacher.model');


const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findOneAndUpdate({ mscb: id }, req.body);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not Found" });
        }
        const updateTeacher = await Teacher.find({ mscb: id });
        res.status(200).json({ updateTeacher: updateTeacher });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const loginTeacher = async (req, res) => {
    try {
        const { mscb, password } = req.body;
        const teacher = await Teacher.findOne({ mscb: mscb });
        if (!teacher) {
            return res.status(404).json({ message: "Wrong mscb" });
        }

        if (password === teacher.password) {
            return res.status(200).json(teacher);
        }

        return res.status(404).json({ message: "Wrong password" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    getTeachers,
    updateTeacher,
    addTeacher,
    loginTeacher
}