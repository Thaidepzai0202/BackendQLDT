const express = require("express");
const router = express.Router();
const { getSubjects, updateSubject, addSubject } = require('../controller/subject.controller')



router.get('/', getSubjects);

router.put('/:id', updateSubject);

router.post('/', addSubject);




module.exports = router;