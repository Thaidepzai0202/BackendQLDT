

const mongoose = require('mongoose');
const express = require('express');
const Student = require('./models/student.model');
const studentRoute = require('./routes/student.route');
const app = express();
app.use(express.json());

mongoose.connect(
    'mongodb://localhost:27017/quanlydaotao', {
})
    .then((err, db) => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//route
app.use("/api/students", studentRoute)

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


