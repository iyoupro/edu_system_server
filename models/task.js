const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    submitDate:{
        type:String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm')
    },
    lastDate:{
        type: String,
        required: true,
    },
    appendix:{
        type: String,
        default: ""
    },
    taskId:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
})

module.exports = task = mongoose.model('task', taskSchema);