'use strict'
/**  Module Dependencies **/

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let HistorySchema = new Schema({

  historyId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  
  taskId: {
    type: String,
    default: '',
  },

  itemId: {
    type: String,
    default: '',
  },

  key: {
    type: String,
    default: '',
  },
  
  itemValues:[],
  
  createdOn: {
    type: Date,
    default: Date.now()
  }

})

module.exports = mongoose.model('History', HistorySchema);