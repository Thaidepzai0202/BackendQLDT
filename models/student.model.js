const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../database');

const Student = sequelize.define('Student',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mssv: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false,
    },


},{
    tabltableName: 'students',
    timestamps: false,
}
);

module.exports = Student;