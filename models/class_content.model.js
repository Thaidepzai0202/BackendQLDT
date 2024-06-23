const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Tệp này chứa cấu hình kết nối của bạn
const ClassRoom = require('../models/class.model');
const Attendance = require('../models/attendance.model');

const ClassContent = sequelize.define('ClassContent', {
    classID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mssv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    midScore: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    finalScore: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
}, {
    tableName: 'classcontents',
    hooks: {
        beforeCreate: async (classContent, options) => {
            classContent.midScore = 0.0;
            classContent.finalScore = 0.0;
        },
        afterCreate: async (classContent, options) => {
            try {
                await ClassRoom.increment('currentStudent', { 
                    by: 1, 
                    where: { classID: classContent.classID } 
                });
                const attendance = {
                    mssv: classContent.mssv,
                    classID: classContent.classID
                };
                await Attendance.create(attendance);
            } catch (error) {
                throw new Error(error);
            }
        }
    }
});

module.exports = ClassContent;




// const mongoose = require('mongoose');
// const ClassRoom = require('../models/class.model');
// const Attendance = require('../models/attendance.model');



// const ClassContentSchema = new mongoose.Schema({
//     classID: {
//         type: String,
//         required: true,
//     },
//     mssv: {
//         type: String,
//         required: true,
//     },
//     midScore: {
//         type: Number,
//         // required: true,
//     },
//     finalScore: {
//         type: Number,
//         // required: true,
//     },
    
    
// });

// ClassContentSchema.pre('save', async function (next) {
    
//     this.midScore = 0.0;
//     this.finalScore = 0.0;

//     next();
// });

// ClassContentSchema.post('save', async function (doc, next) {
//     try {
//         await ClassRoom.findOneAndUpdate(
//             { classID: this.classID },
//             { $inc: { currentStudent: 1 } }
//         );
//         const attendance = {
//             mssv : this.mssv,
//             classID : this.classID
//         };
//         await Attendance.create(attendance);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// const ClassContent = mongoose.model('classesContent', ClassContentSchema);

// module.exports = ClassContent;
