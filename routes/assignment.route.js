const express = require("express");
const router = express.Router();
const {submitAssignment,getAssignment } = require('../controller/assignment.controller')



// router.get('/', getClassRooms);

// router.put('/:id', updateClassRoom);

router.get('/', getAssignment);

router.post('/', submitAssignment);

// router.post('/getTest', getTest);


module.exports = router;