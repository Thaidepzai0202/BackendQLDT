const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../database');

const Attendance = sequelize.define('Attendance', {
    classID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mssv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    dataAttendance: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
}, {
    tableName: "attendances",
    timestamps: false
});


module.exports = Attendance;



// const mongoose = require('mongoose');


// const AttendanceSchema = new mongoose.Schema({

//     classID: {
//         type: String,
//         required: true,
//     },
//     mssv: {
//         type: String,
//         required: true,
//     },
//     lock: {
//         type: Number,
//     },
//     dataAttendance: [{
//         type: Number,
//     }],
// });

// AttendanceSchema.pre("save", async function (next) {
//     try {
//         this.lock = 0;
//         this.dataAttendance = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//         next();
//     } catch (error) {
//         next(error);
//     }

// })
// const Attendance = mongoose.model('attendances', AttendanceSchema);

// module.exports = Attendance;
