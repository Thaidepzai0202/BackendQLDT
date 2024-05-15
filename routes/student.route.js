const express = require("express");
const router = express.Router();
const { getStudents, updateStudent, addStudent,loginStudent } = require('../controller/student.controller')



router.get('/', getStudents);

router.put('/:id', updateStudent);

router.post('/', addStudent);

router.post('/login', loginStudent);


module.exports = router;