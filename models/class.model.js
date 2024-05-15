const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const ClassRoomSchema = mongoose.Schema({
    className: {
        type: String,
        require: true
    },
    classID: {
        type: String,
        default: uuidv4,
        unique: true
    },
    mscb: {
        type: String,
        require: true,
    },
    subjectID: {
        type: String,
        require: true,
    },
    dayOfWeek: {
        type: String,
        require: true,
    },
    classSession: {
        type: String,
        require: true,
    },
},
);

const ClassRoom = mongoose.model("classes", ClassRoomSchema);
module.exports = ClassRoom;