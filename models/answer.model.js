const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Đảm bảo bạn đã cấu hình kết nối Sequelize
const Question = require('../models/question.model');


const Answer = sequelize.define('Answer', {
    idAnswer: {
        type: DataTypes.STRING,
        primaryKey: true,
        // allowNull: false,
    },
    idQuestion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mssv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
    },
    dataAnswers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'answers',
    timestamps: false,
});

// Hook trước khi tạo mới Answer
Answer.beforeCreate(async (answer, options) => {
    const lastAnswer = await Answer.findOne({
        order: [['createdAt', 'DESC']]
    });

    const lastID = lastAnswer ? parseInt(lastAnswer.idAnswer.replace('ans', ''), 10) : 0;
    const newID = lastID + 1;
    answer.idAnswer = 'ans' + newID.toString().padStart(7, '0');

    // Lấy câu hỏi từ Question model (giả sử bạn đã định nghĩa Question model)

    const question = await Question.findOne({ where: { idQuestion: answer.idQuestion } });

    if (question) {
        if (markingExam(question.dataCorrectAnswer, answer.dataAnswers, question.type)) {
            answer.score = question.score;
        } else {
            answer.score = 0;
        }
        answer.type = question.type;
    }
});

// Hàm kiểm tra đáp án
function markingExam(correctAnswer, yourAnswer, type) {
    if (type === 0 || type === 2) {
        return correctAnswer === yourAnswer;
    } else if (type === 1) {
        const arr1 = correctAnswer.split('//').sort();
        const arr2 = yourAnswer.split('//').sort();
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    } else {
        return false;
    }
}

module.exports = Answer;


// const mongoose = require('mongoose');
// const Question = require('./question.model');


// const AnswerSchema = new mongoose.Schema({
//     idAnswer: {
//         type: String,
//         unique: true,
//     },
//     idQuestion: {
//         type: String,
//         required: true,
//     },
//     mssv: {
//         type: String,
//         required: true,
//     },
//     type: {
//         type: Number,
//     },
//     dataAnswers: {
//         type: String,
//         required: true,
//     },
//     score: {
//         type: Number,
//     },
//     createdAt: { type: Date, default: Date.now }
// });

// AnswerSchema.pre("save", async function (next) {
//     const lastAnswer = await this.constructor.findOne().sort({ createdAt: -1 });
//     const lastID = lastAnswer ? lastAnswer.idAnswer : 'ans0000000';
//     const idNumber = parseInt(lastID.replace('ans', ''), 10) + 1;
//     this.idAnswer = 'ans' + idNumber.toString().padStart(7, '0');

//     const question = await Question.findOne({ idQuestion: this.idQuestion });
//     if (markingExam(question.dataCorrectAnswer, this.dataAnswers, question.type)) {
//         this.score = question.score;
//     } else {
//         this.score = 0;
//     }
//     this.type = question.type;

//     next();
// })


// function markingExam(correctAnswer, yourAnswer, type) {
//     if (type == 0 || type == 2) {
//         if (correctAnswer == yourAnswer) return true;
//         else return false;
//     } else if (type == 1) {
//         const arr1 = correctAnswer.split('//');
//         const arr2 = yourAnswer.split('//');
//         if (arr1.length !== arr2.length) {
//             return false;
//         }
//         arr1.sort();
//         arr2.sort();
//         for (let i = 0; i < arr1.length; i++) {
//             if (arr1[i] !== arr2[i]) {
//                 return false;
//             }
//         }
//         return true;
//     } else {
//         return false;
//     }
// }

// const Answer = mongoose.model('answer', AnswerSchema);

// module.exports = Answer;
