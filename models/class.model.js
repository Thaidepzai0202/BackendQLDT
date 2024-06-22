const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../database');




const ClassRoom = sequelize.define('ClassRoom', {
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    classID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    mscb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subjectID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    classSession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    maxStudent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currentStudent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'classes',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

// Hook để sinh tự động classID
ClassRoom.beforeValidate(async (classRoom, options) => {
    if (!classRoom.classID) {
        const lastClassRoom = await ClassRoom.findOne({
            order: [['createdAt', 'DESC']]
        });

        if (lastClassRoom) {
            const lastID = lastClassRoom.classID.replace('class', '');
            const newID = parseInt(lastID, 10) + 1;
            classRoom.classID = 'class' + newID.toString().padStart(7, '0');
        } else {
            classRoom.classID = 'class0000001'; // Nếu chưa có bản ghi nào
        }
        classRoom.semester = "20232";
    }
});

module.exports = ClassRoom;


// const mongoose = require('mongoose');
// const Subject = require('./subject.model');

// const ClassRoomSchema = new mongoose.Schema({
//     className: {
//         type: String,
//         required: true
//     },
//     classID: {
//         type: String,
//         unique: true,
//     },
//     mscb: {
//         type: String,
//         required: true,
//     },
//     subjectID: {
//         type: Object,
//         required: true,
//     },
//     dayOfWeek: {
//         type: String,
//         required: true,
//     },
//     classSession: {
//         type: String,
//         required: true,
//     },
//     semester: {
//         type: String,
//         required: true,
//     },
//     maxStudent: {
//         type: Number,
//         required: true,
//     },
//     currentStudent: {
//         type: Number,
//     },
//     dataSubject: {
//         type: Object,
//         required: false,
//     },
//     dataTeacher: {
//         type: Object,
//         required: false,
//     },
//     createdAt: { type: Date, default: Date.now }
// });

// ClassRoomSchema.pre('save', async function (next) {
//     if (!this.classID) {
//         this.currentStudent = 0;
//         this.dataTeacher = null;
//         const lastClassRoom = await this.constructor.findOne().sort({ createdAt: -1 });
//         const lastID = lastClassRoom ? lastClassRoom.classID : 'class0000000';
//         const idNumber = parseInt(lastID.replace('class', ''), 10) + 10;
//         this.classID = 'class' + idNumber.toString().padStart(7, '0');
//     }
//     next();
// });

// ClassRoomSchema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();
//     if (update.subjectID) {
//         try {
//             // Tìm tài liệu Subject bằng subjectID (string)
//             const subject = await Subject.findOne({ subjectID: update.subjectID });
//             if (!subject) {
//                 throw new Error('Subject not found');
//             }
//             // Gán ObjectId của Subject cho subjectID
//             update.subjectID = subject._id;
//             update.dataSubject = {
//                 subjectName: subject.subjectName,
//                 subjectID: subject.subjectID,
//                 credit: subject.credit
//             };
//         } catch (error) {
//             return next(error);
//         }
//     }
//     next();
// });

// const ClassRoom = mongoose.model('classes', ClassRoomSchema);

// module.exports = ClassRoom;
