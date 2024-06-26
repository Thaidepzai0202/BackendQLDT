


const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('quanly', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });


const sequelize = new Sequelize('quanlydaotao', 'root', 'Thai123h.', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
