const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
    },
    stuId: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = student = mongoose.model('student', studentSchema);