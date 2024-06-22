const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../database');

const Teacher = sequelize.define('Teacher',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mscb: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: false,
    },


},{
    tableName : "teachers",
    timestamps : false
}
);

module.exports = Teacher;

// sequelize.sync()
//     .then(() => {
//         console.log('Database & tables created!');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });