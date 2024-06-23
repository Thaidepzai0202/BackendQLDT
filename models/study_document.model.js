const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const StudyDocument = sequelize.define('StudyDocument', {
    idStudy: {
        type: DataTypes.STRING,
        unique: true,
    },
    classID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'studydocuments',
    timestamps: false,
});

// Hook để tự động sinh idStudy
StudyDocument.beforeCreate(async (studyDoc, options) => {
    const lastStudyDoc = await StudyDocument.findOne({
        order: [['createdAt', 'DESC']]
    });

    const lastID = lastStudyDoc ? lastStudyDoc.idStudy : 'stu0000000';
    const idStudy = parseInt(lastID.replace('stu', ''), 10) + 1;
    studyDoc.idStudy = 'stu' + idStudy.toString().padStart(7, '0');
});

module.exports = StudyDocument;


// const mongoose = require('mongoose');


// const StudyDocumentSchema = new mongoose.Schema({
//     idStudy: {
//         type: String,
//         unique: true,
//     },
//     classID: {
//         type: String,
//         required: true,
//     },
//     dataLink: {
//         type: String,
//         required: true,
//     },
//     createdAt: { type: Date, default: Date.now }
// });

// StudyDocumentSchema.pre("save", async function (next) {
//     const lastStudyDoc = await this.constructor.findOne().sort({ createdAt: -1 });
//     const lastID = lastStudyDoc ? lastStudyDoc.idStudy : 'stu0000000';
//     const idStudy = parseInt(lastID.replace('stu', ''), 10) + 1;
//     this.idStudy = 'stu' + idStudy.toString().padStart(7, '0');
//     next();
// })

// const StudyDocument = mongoose.model('studydocuments', StudyDocumentSchema);

// module.exports = StudyDocument;