const mongoose = require('mongoose');
const TeacherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mscb: {
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
    position: {
        type: String,
        require: true,
    },
    faculty: {
        type: String,
        require: true,
    },


},
);

const Teacher = mongoose.model("teachers", TeacherSchema);
module.exports = Teacher;