
const mongoose = require('mongoose');
const Subject = require('./subject.model');

const ClassRoomSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    classID: {
        type: String,
        // default: uuidv4,
        unique: true,
        // required : true
    },
    mscb: {
        type: String,
        required: true,
    },
    subjectID: {
        type: Object,
        required: true,
    },
    dayOfWeek: {
        type: String,
        required: true,
    },
    classSession: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    maxStudent: {
        type: Number,
        required: true,
    },
    currentStudent: {
        type: Number,
    },
    dataSubject: {
        type: Object,
        required: false,
    },
    dataTeacher: {
        type: Object,
        required: false,
    },
    createdAt: { type: Date, default: Date.now }
});

ClassRoomSchema.pre('save', async function (next) {
    if (!this.classID) {
        this.currentStudent = 0;
        this.dataTeacher = null;
        const lastClassRoom = await this.constructor.findOne().sort({ createdAt: -1 });
        const lastID = lastClassRoom ? lastClassRoom.classID : 'class0000000';
        const idNumber = parseInt(lastID.replace('class', ''), 10) + 10;
        this.classID = 'class' + idNumber.toString().padStart(7, '0');
    }
    next();
});

ClassRoomSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.subjectID) {
        try {
            // Tìm tài liệu Subject bằng subjectID (string)
            const subject = await Subject.findOne({ subjectID: update.subjectID });
            if (!subject) {
                throw new Error('Subject not found');
            }
            // Gán ObjectId của Subject cho subjectID
            update.subjectID = subject._id;
            update.dataSubject = {
                subjectName: subject.subjectName,
                subjectID: subject.subjectID,
                credit: subject.credit
            };
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const ClassRoom = mongoose.model('classes', ClassRoomSchema);

module.exports = ClassRoom;
