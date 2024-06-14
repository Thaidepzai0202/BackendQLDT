const express = require("express");
const router = express.Router();
const { addAttendance, getAttendanceInClass, updateAttendanceInClass, getLockClass, updateLockClass } = require('../controller/attendance.controller')





router.post('/doattendance/', addAttendance);

router.get('/doattendance/:classID', getAttendanceInClass);

router.put('/doattendance/:classID', updateAttendanceInClass);

router.get('/getlock/:classID', getLockClass);

router.put('/getlock/:classID', updateLockClass);






module.exports = router;