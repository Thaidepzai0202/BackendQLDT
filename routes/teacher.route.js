const express = require("express");
const router = express.Router();
const {getTeachers, updateTeacher, addTeacher,loginTeacher} = require('../controller/teacher.controller')



router.get('/',getTeachers);

router.put('/:id',updateTeacher);

router.post('/',addTeacher);

router.post('/login', loginTeacher);

module.exports = router;