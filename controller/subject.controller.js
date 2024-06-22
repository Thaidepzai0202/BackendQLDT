const Subject = require('../models/subject.model');
const connection = require('../connect');


const getSubjects = async (req, res) => {
    try {
        const data = await connection.query("SELECT * FROM subjects");
        if (!data) {
            return res.status(404).json({ message: "No subject found" })
        }

        return res.status(200).json(data[0]);
        // const subjects = await Subject.find();
        // res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findOneAndUpdate({ subjectID: id }, req.body);
        if (!subject) {
            return res.status(404).json({ message: "Subject not Found" });
        }
        const updateSubject = await Subject.find({ subjectID: id });
        res.status(200).json({ updateSubject: updateSubject });

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