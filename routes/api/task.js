const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const moment = require('moment');
const Task = require('../../models/task');
const Course = require('../../models/course');
const TaskGrade = require('../../models/taskGrade');
const passport = require('passport');

createData = () => {
    const course = [{
        name: '课程设计',
        teacher: '1'
    }]
}

router.get('/init', (req, res) => {
    const tasks = [];
    for (let index = 0; index < 10; index++) {
        const taskEle = new TaskGrade({
            task_Id: '5d53a15f4c987eb383d2bcc2',
            stuId: '' + index
        })
        tasks.push(taskEle);

    }
    TaskGrade.insertMany(tasks)
        .catch(err => console.log(err));
})

router.post('/getTeaTask', (req, res) => {
    getTeaTask(req, res);
});

async function getTeaTask(req, res) {
    const teaTask = [];
    const teaCourse = [];
    await Course.aggregate([{
                $match: {
                    teacher: req.body.teacherId
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: 'taskId',
                    foreignField: 'taskId',
                    as: 'task'
                }
            }
        ])
        .then(value => {
            value.forEach(taskEle => {
                const cour = {
                    name: taskEle.name,
                    taskId: taskEle.taskId
                }
                teaCourse.push(cour);
                if (taskEle.task.length != 0) {
                    taskEle.task.forEach(tasks => {
                        tasks.status = tasks.status ? '已完成' : '未完成';
                        tasks.name = taskEle.name;
                        teaTask.push(tasks)
                    })
                }
            })
        });
    res.json({
        statu: 1,
        teaTasks: teaTask,
        teaCourses: teaCourse
    })
}

router.post('/getTeaTaskGrade', (req, res) => {
    getTeaTaskGrade(req, res);
})

async function getTeaTaskGrade(req, res) {
    await TaskGrade.aggregate([{
            $match: {
                task_Id: mongoose.Types.ObjectId(req.body._id)
            }
        }, {
            $lookup: {
                from: 'students',
                localField: 'stuId',
                foreignField: 'stuId',
                as: 'student'
            }
        }])
        .then(value => {
            res.json({
                statu: 1,
                allTaskGrade: JSON.stringify(value)
            })
        })
}

router.post('/deleteTask', (req, res) => {
    Task.remove({
            _id: mongoose.Types.ObjectId(req.body._id)
        })
        .then(e => {
            TaskGrade.remove({
                    task_Id: mongoose.Types.ObjectId(req.body._id)
                })
                .then(() => {
                    res.json({
                        statu: 1
                    })
                })
                .catch(() => {
                    res.json({
                        statu: 0
                    })
                })
        })
        .catch(() => {
            res.json({
                statu: 0
            })
        })
})

router.post('/updateTaskGrade', (req, res) => {
    TaskGrade.update({
            _id: mongoose.Types.ObjectId(req.body._id)
        }, {
            grade: req.body.grade,
            evaluate: req.body.evaluate
        })
        .then(() => {
            res.json({
                statu: 1
            })
        })
        .catch(() => {
            res.json({
                statu: 0
            })
        })
})

router.post('/addNewTask', (req, res) => {
    console.log(req.body);
    const newTask = new Task({
        lastDate: req.body.date,
        taskId: req.body.course,
        appendix: req.body.appendix
    })
    newTask.save()
        .then(() => {
            res.json({
                statu: 1
            })
        })
        .catch(() => {
            res.json({
                statu: 0
            })
        })
})

module.exports = router;