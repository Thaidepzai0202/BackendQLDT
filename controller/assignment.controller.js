const Assignment = require('../models/assignment.model');
const Test = require('../models/test.model');
const Question = require('../models/question.model');
const Answer = require('../models/answer.model');


const submitAssignment = async (req, res) => {

    try {
        const assignmentInput = req.body;

        const listIDAnswer = [];
        let totalScore = 0;

        const lastAnswer = await Answer.findOne({
            order: [['idAnswer', 'DESC']],
            attributes: ['idAnswer']
        });
        console.log(lastAnswer);
        let lastID = lastAnswer ? parseInt(lastAnswer.idAnswer.replace('ans', ''), 10) : 0;
        if (assignmentInput.dataAnswersStudent && Array.isArray(assignmentInput.dataAnswersStudent)) {
            console.log(assignmentInput.dataAnswersStudent.leght);

            await Promise.all(assignmentInput.dataAnswersStudent.map(async (element) => {
                try {
                    // Tạo idQuestion mới dựa trên idQuestion gần nhất
                    const newID = lastID + 1;
                    const idAnswer = 'ans' + newID.toString().padStart(7, '0');
                    lastID = newID;  // Cập nhật lastID cho lần lặp tiếp theo

                    // Tạo mới câu hỏi với idQuestion đã được thêm vào
                    const newAnswer = await Answer.create({ ...element, idAnswer: idAnswer }, { validate: false });
                    listIDAnswer.push(newAnswer.idAnswer);
                    totalScore += newAnswer.score;
                } catch (error) {
                    console.error('Validation error:', error);
                    // Xử lý lỗi validation tại đây
                }
            }));
        }
        assignmentInput.listIDAnswer = listIDAnswer.join(',');
        assignmentInput.totalScore = totalScore;
        const newTest = await Assignment.create(assignmentInput);
        return res.status(200).json(newTest);

        // const assignment1 = req.body;
        // const searchExisted = await Assignment.findOne({ mssv: assignment1.mssv, idTest: assignment1.idTest });
        // if (!searchExisted) {
        //     const assignment2 = await Assignment.create(assignment1);
        //     return res.status(200).json(assignment2);
        // }
        // return res.status(410).json({ message: "You submited" });


    } catch (error) {

        res.status(504).json({ message: error.message });
    }

}


const getAssignment = async (req, res) => {
    try {
        const { idTest, mssv } = req.query;

        const searchExisted = await Assignment.findOne({
            where: {
                mssv: mssv,
                idTest: idTest
            }
        });

        if (!searchExisted) {
            const test = await Test.findOne({
                where: {
                    idTest: idTest
                }
            });

            if (test) {
                const questions = await Question.findAll({
                    where: {
                        idQuestion: test.listIDQuestion
                    }
                });
                return res.status(200).json({ ...test.toJSON(), dataQuestions: questions });
            } else {
                return res.status(404).send("Test not found");
            }
        } else {
            let answerIds = searchExisted.listIDAnswer;
            if (!Array.isArray(answerIds)) {
                answerIds = answerIds.split(',');
            }

            const answers = await Answer.findAll({
                where: {
                    idAnswer: answerIds
                }
            });
            return res.status(200).json({ ...searchExisted.toJSON(), dataAnswersStudent: answers });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(504).json({ message: error.message });
    }
};


module.exports = {
    submitAssignment,
    getAssignment
}