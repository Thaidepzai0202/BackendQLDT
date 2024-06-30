const express = require("express");
const router = express.Router();
const {submitAssignment,getAssignment,getListAssignmentInClass } = require('../controller/assignment.controller')



// router.get('/', getClassRooms);

// router.put('/:id', updateClassRoom);

router.get('/', getAssignment);

router.post('/', submitAssignment);

router.post('/getListTest', getListAssignmentInClass);


module.exports = router;