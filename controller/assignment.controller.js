const Assignment = require('../models/assignment.model');
const Test = require('../models/test.model');
const Question = require('../models/question.model');
const Answer = require('../models/answer.model');


const submitAssignment = async (req, res) => {

    try {
        const assignment1 = req.body;
        const searchExisted = await Assignment.findOne({ mssv: assignment1.mssv, idTest: assignment1.idTest });
        if (!searchExisted) {
            const assignment2 = await Assignment.create(assignment1);
            return res.status(200).json(assignment2);
        }
        return res.status(410).json({ message: "You submited" });


    } catch (error) {

        res.status(504).json({ message: error.message });
    }

}
const getAssignment = async (req, res) => {

    try {
        const idTest = req.query.idTest;
        const mssv = req.query.mssv;
        const searchExisted = await Assignment.findOne({ mssv: mssv, idTest: idTest });
        if (!searchExisted) {
            const test = await Test.findOne({ idTest: idTest });
            if (test) {
                const questions = await Question.find({ idQuestion: { $in: test.listIDQuestion } });
                return res.status(200).json({ ...test.toObject(), dataQuestions: questions });
            } else {
                return res.status(404).send("not found test");
            }

        } else {
            const answers = await Answer.find({ idAnswer: { $in: searchExisted.listIDAnswer } });
            return res.status(200).json({ ...searchExisted.toObject(), dataAnswersStudent: answers });

        }

    } catch (error) {

        res.status(504).json({ message: error.message });
    }

}

module.exports = {
    submitAssignment,
    getAssignment
}