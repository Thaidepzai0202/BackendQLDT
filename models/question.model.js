const mongoose = require('mongoose');


const QuestionsSchema = new mongoose.Schema({
    idQuestion: {
        type: String,
        unique: true,
    },
    dataQuestion: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    dataAnswers: {
        type: String,
        // required: true,
    },
    dataCorrectAnswer: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
});

QuestionsSchema.pre("save", async function (next) {
    const lastQuestion = await this.constructor.findOne().sort({ createdAt: -1 });
    const lastID = lastQuestion ? lastQuestion.idQuestion : 'ques0000000';
    const idNumber = parseInt(lastID.replace('ques', ''), 10) + 1;
    this.idQuestion = 'ques' + idNumber.toString().padStart(7, '0');
    next();
})
const Question = mongoose.model('questions', QuestionsSchema);

module.exports = Question;
