const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Question = sequelize.define('Question', {
    idQuestion: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    dataQuestion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dataAnswers: {
        type: DataTypes.STRING,
    },
    dataCorrectAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'questions',
    timestamps: false,
});

// Hook để sinh tự động idQuestion
Question.beforeCreate(async (question, options) => {
    const lastQuestion = await Question.findOne({
        order: [['createdAt', 'DESC']]
    });

    const lastID = lastQuestion ? lastQuestion.idQuestion.replace('ques', '') : '0000000';
    const newID = parseInt(lastID, 10) + 1;
    question.idQuestion = 'ques' + newID.toString().padStart(7, '0');
});

module.exports = Question;



// const mongoose = require('mongoose');


// const QuestionsSchema = new mongoose.Schema({
//     idQuestion: {
//         type: String,
//         unique: true,
//     },
//     dataQuestion: {
//         type: String,
//         required: true,
//     },
//     type: {
//         type: Number,
//         required: true,
//     },
//     dataAnswers: {
//         type: String,
//         // required: true,
//     },
//     dataCorrectAnswer: {
//         type: String,
//         required: true,
//     },
//     score: {
//         type: Number,
//         required: true,
//     },
//     createdAt: { type: Date, default: Date.now }
// });

// QuestionsSchema.pre("save", async function (next) {
//     const lastQuestion = await this.constructor.findOne().sort({ createdAt: -1 });
//     const lastID = lastQuestion ? lastQuestion.idQuestion : 'ques0000000';
//     const idNumber = parseInt(lastID.replace('ques', ''), 10) + 1;
//     this.idQuestion = 'ques' + idNumber.toString().padStart(7, '0');
//     next();
// })
// const Question = mongoose.model('questions', QuestionsSchema);

// module.exports = Question;
