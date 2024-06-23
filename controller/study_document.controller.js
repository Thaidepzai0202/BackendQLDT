const StudyDocument = require('../models/study_document.model');

const getStudyDocument = async (req, res) => {
    try {
        const { classID } = req.params;
        const studyDocuments = await StudyDocument.findAll({
            where: { classID: classID }
        });
        res.status(200).json(studyDocuments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudyDocument = async (req, res) => {
    try {
        const { idStudy } = req.params;
        const study = req.body;

        const [updated] = await StudyDocument.update(study, {
            where: { idStudy: idStudy }
        });

        if (updated === 1) {
            const updatedStudyDocument = await StudyDocument.findOne({
                where: { idStudy: idStudy }
            });
            res.status(200).json(updatedStudyDocument);
        } else {
            res.status(404).json({ message: 'Study Document not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addStudyDocument = async (req, res) => {
    try {
        const study = req.body;
        const newStudyDocument = await StudyDocument.create(study);
        res.status(200).json(newStudyDocument);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStudyDocument = async (req, res) => {
    try {
        const { idStudy } = req.params;
        const deletedStudyDocument = await StudyDocument.findOne({
            where: { idStudy: idStudy }
        });

        if (!deletedStudyDocument) {
            return res.status(404).json({ message: 'Study Document not found' });
        }

        await StudyDocument.destroy({
            where: { idStudy: idStudy }
        });

        res.status(200).json(deletedStudyDocument);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getStudyDocument,
    addStudyDocument,
    updateStudyDocument,
    deleteStudyDocument 
};


// const StudyDocument = require('../models/study_document.model');

// const getStudyDocument = async (req, res) => {
//     try {
//         const {classID} = req.params;
//         const studyDocument = await StudyDocument.find({classID: classID});
//         res.status(200).json(studyDocument);


//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const updateStudyDocument = async (req, res) => {
//     try {
//         const {idStudy} = req.params;
//         const study = req.body;
//         const studyDocument = await StudyDocument.findOneAndUpdate({idStudy : idStudy},study);
//         const studyDocument2  = await StudyDocument.findOne({idStudy : idStudy});
//         res.status(200).json(studyDocument2);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const addStudyDocument = async (req, res) => {
//     try {
//         const study = req.body;
//         const studyDocument = await StudyDocument.create(study);
//         res.status(200).json(studyDocument);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const deleteStudyDocument = async (req, res) => {
//     try {
//         const {idStudy} = req.params;

//         const studyDocument = await StudyDocument.findOneAndDelete({idStudy:idStudy});
//         res.status(200).json(studyDocument);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// module.exports = {
//     getStudyDocument,
//     addStudyDocument,
//     updateStudyDocument,
//     deleteStudyDocument 
// }