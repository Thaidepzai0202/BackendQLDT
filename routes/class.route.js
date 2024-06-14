const express = require("express");
const router = express.Router();
const { getClassRooms, updateClassRoom, addClassRoom,getClassRoom } = require('../controller/class.controller')



router.get('/', getClassRooms);

router.put('/:id', updateClassRoom);

router.get('/:id', getClassRoom);

router.post('/', addClassRoom);


module.exports = router;