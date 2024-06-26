

const mongoose = require('mongoose');
const express = require('express');
const http = require("http");
const Student = require('./models/student.model');

const studentRoute = require('./routes/student.route');
const productRoute = require('./routes/product.route');
const teacherRoute = require('./routes/teacher.route');
const subjectRoute = require('./routes/subject.route');
const classRoute = require('./routes/class.route');
const classContentRoute = require('./routes/class_content.route');
const testRoute = require('./routes/test.route');
const assignmentRoute = require('./routes/assignment.route');
const attendanceRoute = require('./routes/attendance.route');
const studyDocumentRoute = require('./routes/study_document.route');
const app = express();
app.use(express.json());

// mongoose.connect(
//     'mongodb+srv://nguyenthethai02022001:3qCKr2jT80jpA5Qh@quanlydaotao.aempkbm.mongodb.net/?retryWrites=true&w=majority&appName=quanlydaotao', {
// })
//     .then((err, db) => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });
mongoose.connect(
    'mongodb://localhost:27017/quanlydaotao', {
})
    .then((err, db) => {
        console.log('Connected to MongoDB LOCAL :27017');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//route
app.use("/api/products", productRoute);
app.use("/api/students", studentRoute);
app.use("/api/teachers", teacherRoute);
app.use("/api/subjects", subjectRoute);
app.use("/api/classes", classRoute);
app.use("/api/classContents", classContentRoute);
app.use("/api/tests", testRoute);
app.use("/api/assignment", assignmentRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/studydocument", studyDocumentRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000
// const port = 1234

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


