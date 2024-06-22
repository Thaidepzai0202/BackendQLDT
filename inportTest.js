const mongoose = require('mongoose');
const express = require('express');
const http = require("http");
const app = express();
app.use(express.json());
const { Sequelize } = require('sequelize');




// Kết nối Sequelize đến MySQL
const sequelize = new Sequelize('quanly', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Tắt logging SQL queries
});

// Kiểm tra kết nối Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the databasessss:', err);
  });




// mongoose.connect(
//   'mongodb://localhost:27017/quanlydaotao', {
// })
//   .then((err, db) => {
//     console.log('Connected to MongoDB LOCAL :27017');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });




// //route
const studentRoute = require('./routes/student.route');
const teacherRoute = require('./routes/teacher.route');
// const subjectRoute = require('./routes/subject.route');
const classRoute = require('./routes/class.route');


// //use route
app.use("/api/students", studentRoute);
app.use("/api/teachers", teacherRoute);
// app.use("/api/subjects", subjectRoute);
app.use("/api/classes", classRoute);





const port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

