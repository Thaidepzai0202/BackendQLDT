const mongoose = require('mongoose');
// const Question = require('../models/question.model');
const Answer = require('../models/answer.model');


const AssignmentSchema = new mongoose.Schema({
    idTest: {
        type: String,
    },
    idAssignment: {
        type: String,
        unique: true,
    },
    listIDAnswer:[{type: String}],
    mssv:{
        type: String,
        require: true,
    },
    dataAnswersStudent:[{type : Object, require:false }],
    totalScore : {type: Number},


    createdAt: { type: Date, default: Date.now }
});

AssignmentSchema.pre("save", async function (next) {
    try {
        //gán cho idAssignment
        const lastTest = await this.constructor.findOne().sort({ createdAt: -1 });
        const lastID = lastTest ? lastTest.idAssignment : 'asign0000000';
        const idNumber = parseInt(lastID.replace('asign', ''), 10) + 1;

        this.idAssignment = 'asign' + idNumber.toString().padStart(7, '0');
        

        //lưu vào answer 
        const savedAnswerIds = [];
        let totalScore = 0;
        for (const answerData of this.dataAnswersStudent) {
            const answer = new Answer(answerData);
            const savedAnswer = await answer.save();        
            // console.log(savedQuestion);
            savedAnswerIds.push(savedAnswer.idAnswer);
            totalScore +=savedAnswer.score;
        }
        this.listIDAnswer = savedAnswerIds;
        this.dataAnswersStudent = null;
        this.totalScore = totalScore;

        next();
    } catch (error) {
        next(error);
    }

})

const Assignment = mongoose.model('assignment', AssignmentSchema);

module.exports = Assignment;