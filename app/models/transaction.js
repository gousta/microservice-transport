const mongoose = require('mongoose')
const { transports } = require('../../transports/kernel')

// Schema
var TransactionSchema = mongoose.Schema({
  transport: {
    type: String,
    lowercase: true,
    required: () => {
      return transports.indexOf(this.transport) > -1
    },
  },
  from: String,
  to: String,
  text: String,
  tag: {
    type: String,
    lowercase: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now
  },
})

// Export
module.exports = mongoose.model('Transaction', TransactionSchema)