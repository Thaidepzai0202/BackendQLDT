
const mongoose = require('mongoose');
const ClassRoom = require('../models/class.model');
const Attendance = require('../models/attendance.model');



const ClassContentSchema = new mongoose.Schema({
    classID: {
        type: String,
        required: true,
    },
    mssv: {
        type: String,
        required: true,
    },
    midScore: {
        type: Number,
        // required: true,
    },
    finalScore: {
        type: Number,
        // required: true,
    },
    
    
});

ClassContentSchema.pre('save', async function (next) {
    
    this.midScore = 0.0;
    this.finalScore = 0.0;

    next();
});

ClassContentSchema.post('save', async function (doc, next) {
    try {
        await ClassRoom.findOneAndUpdate(
            { classID: this.classID },
            { $inc: { currentStudent: 1 } }
        );
        const attendance = {
            mssv : this.mssv,
            classID : this.classID
        };
        await Attendance.create(attendance);
        next();
    } catch (error) {
        next(error);
    }
});

const ClassContent = mongoose.model('classesContent', ClassContentSchema);

module.exports = ClassContent;
