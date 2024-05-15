const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mssv: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    className: {
        type: String,
        require: true,
    },
    course: {
        type: String,
        require: true,
    },


},
);

const Student = mongoose.model("students", StudentSchema);
module.exports = Student;