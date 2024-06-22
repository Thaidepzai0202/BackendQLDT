const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../database');

const Subject = sequelize.define('Subject',{
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    credit: {
        type: Number,
        allowNull: false,
    },
},{
    tableName : "subjects",
    timestamps : false
}
);

module.exports = Subject;