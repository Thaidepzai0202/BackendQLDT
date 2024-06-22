const Teacher = require('../models/teacher.model');
const connection = require('../connect');



const getTeachers = async (req, res) => {
    try {   
        const data = await Teacher.findAll();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowsCount] = await Teacher.update(req.body, {
            where: { mscb: id }
        });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Teacher not Found" });
        }
        const updatedTeacher = await Teacher.findOne({
            where: { mscb: id }
        });
        return res.status(200).json(updatedTeacher);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addTeacher = async (req, res) => {
    try {
        const teacher = req.body;
        if (!teacher.mscb || !teacher.name || !teacher.gender || !teacher.email || !teacher.password || !teacher.position || !teacher.faculty) {
            return res.status(501).json({ message: "Please provide all firelds" });
        }
        const checkExisted = await Teacher.findOne({ where: { mscb: teacher.mscb } });
        if (checkExisted) {
            return res.status(501).json({ message: "Mscb Existed" });
        }
        const success = await Teacher.create(teacher);
        return res.status(200).json(success);


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