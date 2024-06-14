const mongoose = require('mongoose');


const AttendanceSchema = new mongoose.Schema({

    classID: {
        type: String,
        required: true,
    },
    mssv: {
        type: String,
        required: true,
    },
    lock: {
        type: Number,
    },
    dataAttendance: [{
        type: Number,
    }],
});

AttendanceSchema.pre("save", async function (next) {
    try {
        this.lock = 0;
        this.dataAttendance = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        next();
    } catch (error) {
        next(error);
    }

})
const Attendance = mongoose.model('attendances', AttendanceSchema);

module.exports = Attendance;
