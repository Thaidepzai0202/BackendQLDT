const express = require("express");
const router = express.Router();
const { getClassRooms, updateClassRoom, addClassRoom } = require('../controller/class.controller')



router.get('/', getClassRooms);

router.put('/:id', updateClassRoom);

router.post('/', addClassRoom);


module.exports = router;