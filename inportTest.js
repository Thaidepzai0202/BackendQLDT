// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/quanlydaotao', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // createStudentCollection(); // Gọi hàm tạo bảng sinh viên sau khi kết nối thành công
    addStudent(); // Gọi hàm thêm sinh viên sau khi kết nối thành công
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  mssv: {
    type : String,
    unique : true
  },
  name: String,
  gender: String,
  email: String,
  password: String,
  className: String,
  course: String,
});

app.post('/api/product',(req,res) =>{
  res.send('Data Received');
})

const Student = mongoose.model('Student', studentSchema);

async function createStudentCollection() {
  try {
    await mongoose.connection.db.createCollection('student');
    console.log('Student collection created successfully');
  } catch (error) {
    console.error('Error creating student collection:', error);
  }
}

async function addStudent() {
  const newStudent = new Student({
    mssv: "20194669",
    name: "The Thai",
    gender: "Male",
    email: "john.doe@example.com",
    password: "password123",
    className: "CS101",
    course: "Computer Science"
  });

  try {
    await newStudent.save();
    console.log('Student added successfully');
  } catch (error) {
    console.error('Error adding student:', error);
  } finally {
    mongoose.connection.close();
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
