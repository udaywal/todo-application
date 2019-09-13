'use strict'
/**  Module Dependencies **/

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let friendSchema = new Schema({

  friendId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  senderId: {
    type: String,
    default: ''
  },
  senderName: {
    type: String,
    default: ''
  },
  receiverId: {
    type: String,
    default: ''
  },
  receiverName: {
    type: String,
    default: ''
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Friend', friendSchema);