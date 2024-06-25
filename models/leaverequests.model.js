const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Student = require('../models/student.model');

const LeaveRequest = sequelize.define('LeaveRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mssv: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    studentName: {
        type: DataTypes.STRING(255),
        // allowNull: false
    },
    classID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'leaverequests',
    timestamps: false,
});


LeaveRequest.beforeCreate(async (leavereaquest, options) => {
    const student = await Student.findOne({where : {"mssv" : leavereaquest.mssv}});
    leavereaquest.studentName = student.name;
});

// Export model để sử dụng ở nơi khác trong ứng dụng của bạn
module.exports = LeaveRequest;
