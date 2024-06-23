const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Đảm bảo bạn đã cấu hình kết nối Sequelize

const Answer = require('./answer.model'); // Import model Answer

const Assignment = sequelize.define('Assignment', {
    idTest: {
        type: DataTypes.STRING,
    },
    idAssignment: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    listIDAnswer: {
        type: DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue('listIDAnswer');
            if (!rawValue) {
                return [];
            }
            return rawValue.split(',');
        },
        set(value) {
            if (Array.isArray(value)) {
                const newValue = value.join(',');
                this.setDataValue('listIDAnswer', newValue);
            } else {
                this.setDataValue('listIDAnswer', value);
            }
        }, 
    },
    mssv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalScore: {
        type: DataTypes.INTEGER,
        defaultValue : 0
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'assignments',
    timestamps: false,
});

// Hook trước khi tạo mới Assignment
Assignment.beforeCreate(async (assignment, options) => {
    try {
        // Tìm bài tập gần nhất để sinh idAssignment
        const lastAssignment = await Assignment.findOne({
            order: [['createdAt', 'DESC']]
        });

        const lastID = lastAssignment ? parseInt(lastAssignment.idAssignment.replace('asign', ''), 10) : 0;
        const newID = lastID + 1;
        assignment.idAssignment = 'asign' + newID.toString().padStart(7, '0');

        
        
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = Assignment;


// const mongoose = require('mongoose');
// // const Question = require('../models/question.model');
// const Answer = require('../models/answer.model');


// const AssignmentSchema = new mongoose.Schema({
//     idTest: {
//         type: String,
//     },
//     idAssignment: {
//         type: String,
//         unique: true,
//     },
//     listIDAnswer:[{type: String}],
//     mssv:{
//         type: String,
//         require: true,
//     },
//     dataAnswersStudent:[{type : Object, require:false }],
//     totalScore : {type: Number},


//     createdAt: { type: Date, default: Date.now }
// });

// AssignmentSchema.pre("save", async function (next) {
//     try {
//         //gán cho idAssignment
//         const lastTest = await this.constructor.findOne().sort({ createdAt: -1 });
//         const lastID = lastTest ? lastTest.idAssignment : 'asign0000000';
//         const idNumber = parseInt(lastID.replace('asign', ''), 10) + 1;

//         this.idAssignment = 'asign' + idNumber.toString().padStart(7, '0');
        

//         //lưu vào answer 
//         const savedAnswerIds = [];
//         let totalScore = 0;
//         for (const answerData of this.dataAnswersStudent) {
//             const answer = new Answer(answerData);
//             const savedAnswer = await answer.save();        
//             // console.log(savedQuestion);
//             savedAnswerIds.push(savedAnswer.idAnswer);
//             totalScore +=savedAnswer.score;
//         }
//         this.listIDAnswer = savedAnswerIds;
//         this.dataAnswersStudent = null;
//         this.totalScore = totalScore;

//         next();
//     } catch (error) {
//         next(error);
//     }

// })

// const Assignment = mongoose.model('assignment', AssignmentSchema);

// module.exports = Assignment;