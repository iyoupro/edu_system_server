const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    taskId: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = course = mongoose.model('course', courseSchema);