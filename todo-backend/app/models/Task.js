const mongoose = require('mongoose')
const time = require('../libs/timeLib')

const Schema = mongoose.Schema

const Task = new Schema({
    taskId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    taskName: {
        type: String,
        default: ''
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    creatorId: {
        type: String,
        default: ''
    },
    createdBy: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', Task)