const mongoose = require('mongoose')
const { transportsSupported } = require('../../transports/kernel')

// Schema
var TransactionSchema = mongoose.Schema({
  transport: {
    type: String,
    lowercase: true,
    required: true,
    enum: transportsSupported,
  },
  status: {
    type: String,
    index: true,
    lowercase: true,
    required: false,
    default: 'queue',
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    lowercase: true,
    required: false,
  },
  urgent: {
    type: Boolean,
    default: false,
    required: false,
  },
  created: {
    type: Date,
    default: Date.now,
    required: false,
  },
})

// Export
module.exports = mongoose.model('Transaction', TransactionSchema)