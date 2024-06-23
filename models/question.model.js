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
        allowNull: false,
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
        order: [['idQuestion', 'DESC']]
    });

    const lastID = lastQuestion ? parseInt(lastQuestion.idQuestion.replace('ques', ''), 10) : 0;
    const newID = lastID + 1;
    question.idQuestion = 'ques' + newID.toString().padStart(7, '0');
});

module.exports = Question;
