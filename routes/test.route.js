const express = require("express");
const router = express.Router();
const { addTest,getListTest,getTest,deleteTest,getListTestStudent } = require('../controller/test.controller')



// router.get('/', getClassRooms);

// router.put('/:id', updateClassRoom);

router.get('/:classID', getListTest);

router.get('/', getListTest);

router.post('/student/', getListTestStudent);

router.post('/', addTest);

router.post('/getTest', getTest);

router.delete("/:idTest",deleteTest);


module.exports = router;