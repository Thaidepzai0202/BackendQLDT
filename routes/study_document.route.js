const express = require("express");
const router = express.Router();

const { getStudyDocument,
    addStudyDocument,
    updateStudyDocument,
    deleteStudyDocument } = require('../controller/study_document.controller');


router.get('/:classID', getStudyDocument);


router.put('/:idStudy', updateStudyDocument);

router.post('/', addStudyDocument);

router.delete('/:idStudy', deleteStudyDocument);

module.exports = router;