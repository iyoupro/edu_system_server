const express = require('express');
const router = express.Router();
const Course = require('../../models/course');
const Student = require('../../models/student');

const courses = [];
const tasks = [];
const students = [];

router.get('/init', (req, res) => {
    
    for (let index = 0; index < 10; index++) {
        const courseEle = new Course({
            name: '毕业设计' + index,
            teacher: 'tea2',
            taskId: '1'+index
        });
        students.push(courseEle);
    }
    Course.insertMany(students)
        .catch(err => console.log(err));
    //createDB();
})

async function createDB() {
    await Student.find({
            name: /stu/
        })
        .then(stu => {
            stu.map(item => {
                students.push(item);
            })
        });
    Course.findOne({
            teacher: 'tea1'
        })
        .then(result => {
            result.members = students;
            result.save();
        });
}

module.exports = router;