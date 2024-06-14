const mongoose = require('mongoose');
const Question = require('./question.model');


const AnswerSchema = new mongoose.Schema({
    idAnswer: {
        type: String,
        unique: true,
    },
    idQuestion: {
        type: String,
        required: true,
    },
    mssv: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
    },
    dataAnswers: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
    },
    createdAt: { type: Date, default: Date.now }
});

AnswerSchema.pre("save", async function (next) {
    const lastAnswer = await this.constructor.findOne().sort({ createdAt: -1 });
    const lastID = lastAnswer ? lastAnswer.idAnswer : 'ans0000000';
    const idNumber = parseInt(lastID.replace('ans', ''), 10) + 1;
    this.idAnswer = 'ans' + idNumber.toString().padStart(7, '0');

    const question = await Question.findOne({ idQuestion: this.idQuestion });
    if (markingExam(question.dataCorrectAnswer, this.dataAnswers, question.type)) {
        this.score = question.score;
    } else {
        this.score = 0;
    }
    this.type = question.type;

    next();
})


function markingExam(correctAnswer, yourAnswer, type) {
    if (type == 0 || type == 2) {
        if (correctAnswer == yourAnswer) return true;
        else return false;
    } else if (type == 1) {
        const arr1 = correctAnswer.split('//');
        const arr2 = yourAnswer.split('//');
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

const Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
