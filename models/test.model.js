const mongoose = require('mongoose');
const Question = require('../models/question.model');


const TestSchema = new mongoose.Schema({
    idTest: {
        type: String,
        unique: true,
    },
    classID: { type: String, required: true },
    testName: { type: String, required: true },
    listIDQuestion: [{ type: String }],
    dataQuestions: [{
        type: Object,
        required: false,
    }],
    totalScore: { type: Number },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    createdAt: { type: Date, default: Date.now }
});

TestSchema.pre("save", async function (next) {
    try {
        const lastTest = await this.constructor.findOne().sort({ createdAt: -1 });
        const lastID = lastTest ? lastTest.idTest : 'test0000000';
        const idNumber = parseInt(lastID.replace('test', ''), 10) + 1;

        this.idTest = 'test' + idNumber.toString().padStart(7, '0');
        // this.idTest = "test0000002";
        // console.log(this.idTest);

        const savedQuestionIds = [];
        let totalScore = 0;
        for (const questionData of this.dataQuestions) {
            const question = new Question(questionData);
            const savedQuestion = await question.save();
            // console.log(savedQuestion);
            savedQuestionIds.push(savedQuestion.idQuestion);
            totalScore += savedQuestion.score;
        }
        this.totalScore = totalScore;
        this.listIDQuestion = savedQuestionIds;
        this.dataQuestions = [];

        next();
    } catch (error) {
        next(error);
    }

})
TestSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const update = this.getUpdate();
        if (update.dataQuestions) {


            const savedQuestionIds = [];
            let totalScore = 0;
            for (const questionData of update.dataQuestions) {
                const question = new Question(questionData);
                const savedQuestion = await question.save();
                // console.log(savedQuestion);
                savedQuestionIds.push(savedQuestion.idQuestion);
                totalScore += savedQuestion.score;
            }
            update.totalScore = totalScore;
            update.listIDQuestion = savedQuestionIds;
            update.dataQuestions = [];
        }
        next();
    } catch (error) {
        next(error);
    }

})

const Test = mongoose.model('tests', TestSchema);

module.exports = Test;