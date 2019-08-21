const Course = require('../../models/course');
const Task = require('../../models/task');
const Student = require('../../models/student');

const courses = [];
const tasks = [];
const students = [];

createDB = () => {
    for (let index = 0; index < 10; index++) {
        const courseEle = new Course({
            name: '课程设计'+ index,
            teacher: 'tea'+index
        });
        courses.push(courses);
    }
    console.log(courses);
}
createDB();