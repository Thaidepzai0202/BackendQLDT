const Test = require('../models/test.model');
const ClassRoom = require('../models/class.model');
const Question = require('../models/question.model');
const Assignment = require('../models/assignment.model')




// const mongoose = require('mongoose');

const sequelize = require('../database'); // Đảm bảo bạn import đúng sequelize instance

const addTest = async (req, res) => {
    try {
        const testInput = req.body;

        // Tạo mảng để lưu id của các câu hỏi
        const listIDQuestion = [];

        // Tính tổng số điểm của các câu hỏi
        let totalScore = 0;

        // Truy vấn idQuestion gần nhất từ cơ sở dữ liệu
        const lastQuestion = await Question.findOne({
            order: [['idQuestion', 'DESC']]
        });

        let lastID = lastQuestion ? parseInt(lastQuestion.idQuestion.replace('ques', ''), 10) : 0;

        if (testInput.dataQuestions && Array.isArray(testInput.dataQuestions)) {
            await Promise.all(testInput.dataQuestions.map(async (element) => {
                try {
                    // Tạo idQuestion mới dựa trên idQuestion gần nhất
                    const newID = lastID + 1;
                    const idQuestion = 'ques' + newID.toString().padStart(7, '0');
                    lastID = newID;  // Cập nhật lastID cho lần lặp tiếp theo

                    // Tạo mới câu hỏi với idQuestion đã được thêm vào
                    const newQuestion = await Question.create({ ...element, idQuestion }, { validate: false });
                    listIDQuestion.push(newQuestion.idQuestion);
                    totalScore += newQuestion.score;
                } catch (error) {
                    console.error('Validation error:', error);
                    // Xử lý lỗi validation tại đây
                }
            }));
        }

        // Thêm các idQuestion vào listIDQuestion của testInput
        testInput.listIDQuestion = listIDQuestion.join(',');

        // Gán totalScore vào testInput
        testInput.totalScore = totalScore;

        // Kiểm tra nếu tồn tại idTest, thực hiện cập nhật
        if (testInput.idTest) {
            const existingTest = await Test.findOne({ where: { idTest: testInput.idTest } });
            if (existingTest) {
                await existingTest.update(testInput);
                const updatedTest = await Test.findOne({ where: { idTest: testInput.idTest } });
                return res.status(200).json(updatedTest);
            }
        }

        // Nếu không tồn tại idTest, thực hiện thêm mới
        const newTest = await Test.create(testInput);
        return res.status(200).json(newTest);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};



const deleteTest = async (req, res) => {
    try {
        const { idTest } = req.params;

        // Tìm và xóa bài kiểm tra với idTest
        const test = await Test.findOne({ where: { idTest: idTest } });

        if (!test) {
            return res.status(404).json({ message: "Not found" });
        }

        await test.destroy();

        res.status(200).send({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getListTest = async (req, res) => {

    try {
        const { classID: classID } = req.params;
        const test = await Test.findAll({ where: { classID: classID } });
        res.status(200).json(test);

    } catch (error) {
        res.status(505).json({ message: error.message });
    }

}

const getListTestStudent = async (req, res) => {
    try {
        const { mssv, classID } = req.body;

        const tests = await Test.findAll({ where: { classID } });
        const testsWithStatus = [];

        for (const element of tests) {
            const check = await Assignment.findOne({ where: { mssv, idTest: element.idTest } });
            const statusTest = check ? 1 : 0;

            const testWithStatus = {
                ...element.toJSON(), // Chuyển đổi đối tượng Sequelize thành đối tượng JavaScript
                statusTest
            };
            testsWithStatus.push(testWithStatus);
        }

        res.status(200).json(testsWithStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTest = async (req, res) => {
    try {
        const { idTest, mscb } = req.body;
        
        // Tìm bài kiểm tra theo idTest
        const test = await Test.findOne({ where: { idTest } });
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        // Kiểm tra xem người dùng đã làm bài kiểm tra chưa
        const checkDid = await Assignment.findOne({ where: { mssv: mscb, idTest } });

        // Lấy thông tin lớp học của bài kiểm tra
        const classRoom = await ClassRoom.findOne({ where: { classID: test.classID } });
        if (!classRoom) {
            return res.status(404).json({ message: "ClassRoom not found" });
        }

        // Nếu người dùng không phải là người quản lý lớp học và chưa làm bài kiểm tra
        if (classRoom.mscb !== mscb && !checkDid) {
            // Kiểm tra thời gian làm bài
            const now = Date.now();
            const startTime = new Date(test.startTime).getTime();
            const endTime = new Date(test.endTime).getTime();

            if (now < startTime) {
                // Chưa mở bài TEST
                return res.status(411).json({ message: "The test has not started yet." });
            } else if (now > endTime) {
                // Bài Test đã hết hạn
                return res.status(412).json({ message: "The test has ended." });
            }
        }

        // Lấy danh sách câu hỏi theo listIDQuestion
        let questionIDs;
        if (typeof test.listIDQuestion === 'string') {
            questionIDs = test.listIDQuestion.split(',');
        } else if (Array.isArray(test.listIDQuestion)) {
            questionIDs = test.listIDQuestion;
        } else {
            return res.status(500).json({ message: 'Invalid data format for listIDQuestion' });
        }
        
        
        // Chuyển đổi chuỗi thành mảng
        const questions = await Question.findAll({ where: { idQuestion: questionIDs } });

        res.status(200).json({ ...test.toJSON(), dataQuestions: questions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTest };


module.exports = {
    addTest,
    getListTest,
    getTest,
    deleteTest,
    getListTestStudent
}