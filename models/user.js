const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchem = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    identity: {
        type: String
    }
})

module.exports = user = mongoose.model('user', UserSchem);