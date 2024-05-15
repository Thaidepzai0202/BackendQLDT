const mongoose = require('mongoose');
const SubjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        require: true
    },
    subjectID: {
        type: String,
        require: true,
        unique: true
    },
    credit: {
        type: Number,
        require: true,
    },
},
);

const Subject = mongoose.model("subjects", SubjectSchema);
module.exports = Subject;