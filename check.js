const Sequelize = require("sequelize");
const express = require('express');
const http = require("http");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(
   'quanlydaotao',
   'root',
   'Thai123h.',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

//route 
const teacherRoute = require('./routes/teacher.route');
const studentRoute = require('./routes/student.route');
const subjectRoute = require('./routes/subject.route');
const classRoute = require('./routes/class.route');
const attendanceRoute = require('./routes/attendance.route');
const classContentRoute = require('./routes/class_content.route');

//use
app.use("/api/students", studentRoute);
app.use("/api/teachers", teacherRoute);
app.use("/api/classes", classRoute);
app.use("/api/subjects", subjectRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/classContents", classContentRoute);


const port = 3000
// const port = 1234

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
