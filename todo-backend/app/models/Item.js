const mongoose = require('mongoose')
const time = require('../libs/timeLib')

const Schema = mongoose.Schema

let Item = new Schema({
  parentId: {
    type: String,
    default: '',
  },
  itemId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  itemName: {
    type: String,
    default: ''
  },
  itemCreatorId: {
    type: String,
    default: ''
  },
  itemCreatorBy: {
    type: String,
    default: ''
  },
  itemCreatedOn: {
    type: Date,
    default: ""
  }
})

module.exports = mongoose.model('Item', Item);