const express = require("express");
const router = express.Router();
const {addLeaveRequest,getListLRInClass,getListLRStudent} = require('../controller/leaverequest.controller')


router.get('/:id',getListLRInClass);

router.post('/',addLeaveRequest);

router.post('/lrinclass/',getListLRStudent);

module.exports = router;

