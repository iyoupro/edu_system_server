const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const taskGradeSchema = new Schema({
    stuId: {
        type: String,
        required: true
    },
    task_Id:{
        type:Schema.Types.ObjectId,
        required: true
    },
    submitDate:{
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm')
    },
    grade: {
        type: Number,
        max: 100,
        min: 0,
        default: 0
    },
    evaluate: {
        type: String,
        default: ""
    }
})

module.exports = taskGrade = mongoose.model('taskGrade', taskGradeSchema);