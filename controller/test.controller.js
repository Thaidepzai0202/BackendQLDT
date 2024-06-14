const Test = require('../models/test.model');
const ClassRoom = require('../models/class.model');
const Question = require('../models/question.model');
const Assignment = require('../models/assignment.model');



// const mongoose = require('mongoose');


const addTest = async (req, res) => {

    try {
        const test1 = req.body;
        if (test1.idTest != null) {
            console.log(test1.idTest);
            const find = await Test.findOne({ idTest: test1.idTest });
            if (find) {
                // console.log(test1.dataQuestions);
                await Test.findOneAndUpdate({ idTest: test1.idTest }, test1);
                const test3 = await Test.findOne({ idTest: test1.idTest });
                return res.status(200).json(test3);
            }
        }
        const test2 = await Test.create(test1);
        return res.status(200).json(test2);


    } catch (error) {

        res.status(505).json({ message: error.message });
    }

}

const deleteTest = async (req, res) => {

    try {
        const { idTest: idTest } = req.params;
        const test = await Test.findOneAndDelete({ idTest: idTest })
        if (!test) {
            return res.status(404).json({ message: "Not found" })
        }
        // res.status(200).json(test2);
        res.status(200).send({ message: 'Test deleted successfully' });


    } catch (error) {

        res.status(505).json({ message: error.message });
    }

}


const getListTest = async (req, res) => {

    try {
        const { classID: classID } = req.params;
        const test = await Test.find({ classID: classID });
        res.status(200).json(test);

    } catch (error) {
        res.status(505).json({ message: error.message });
    }

}
const getListTestStudent = async (req, res) => {

    try {
        const { mssv, classID } = req.body;

        const test = await Test.find({ classID: classID });
        const testsWithStatus = [];

        for (let index = 0; index < test.length; index++) {
            const element = test[index];
            const check = await Assignment.findOne({ mssv: mssv, idTest: element.idTest });
            const statusTest = check ? 1 : 0;

            const testWithStatus = {
                ...element.toObject(), // Chuyển đổi đối tượng Mongoose thành đối tượng JavaScript
                statusTest: statusTest
            };
            testsWithStatus.push(testWithStatus);
        }


        res.status(200).json(testsWithStatus);

    } catch (error) {
        res.status(505).json({ message: error.message });
    }

}

const getTest = async (req, res) => {

    try {
        const { idTest, mscb } = req.body;
        const test = await Test.findOne({ idTest: idTest });
        const checkDid = await Assignment.findOne({mssv : mscb,idTest:idTest});

        const classRoom = await ClassRoom.findOne({ classID: test.classID });
        if (classRoom.mscb != mscb && !checkDid) {
            //check điều kiện thời gian làm bài 
            const now = Date.now();
            const startTime = new Date(test.startTime).getTime();
            const endTime = new Date(test.endTime).getTime();

            if (now < startTime) {
                //chưa mở bài TEST
                return res.status(411).json({ message: "The test has not started yet." });
            } else if (now > endTime) {
                //bài Test Đã hết hạn
                return res.status(412).json({ message: "The test has ended." });
            }
        }

        const questions = await Question.find({ idQuestion: { $in: test.listIDQuestion } });
        res.status(200).json({ ...test.toObject(), dataQuestions: questions });

    } catch (error) {
        res.status(505).json({ message: error.message });
    }

}



module.exports = {
    addTest,
    getListTest,
    getTest,
    deleteTest,
    getListTestStudent
}