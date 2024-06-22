const Subject = require('../models/subject.model');
const connection = require('../connect');


const getSubjects = async (req, res) => {
    try {
        const data = await Subject.findAll();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowSubject] = await Subject.update(req.body, { where: { subjectID: id } });
        if (updatedRowSubject === 0) {
            return res.status(404).json({ message: "Subject not Found" });
        }
        const updateSubject = await Subject.findOne({ where: { subjectID: id } });
        res.status(200).json(updateSubject);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    getSubjects,
    updateSubject,
    addSubject,
}