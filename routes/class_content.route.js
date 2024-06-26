const express = require("express");
const router = express.Router();
const {
    getClassContents,
    addClassContent,
    getClassContent,
    showListStudent,
    updatePoint,
    addListStudent
} = require('../controller/class_content.controller')



router.get('/', getClassContents);

// router.put('/:id', updateClassRoom);

router.get('/:id', getClassContent);

router.post('/', addClassContent);

router.post('/addListStudent', addListStudent);

router.get('/getListStudent/:id', showListStudent);

router.post('/updatePoint', updatePoint);


module.exports = router;