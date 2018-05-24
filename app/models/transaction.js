
const mongoose = require('mongoose')
const TransportEngine = require('../../transports/engine')

// Schema
var TransactionSchema = mongoose.Schema({
  signature: {
    type: String,
    default: TransportEngine
      .signature(this.transport+this.from+this.to+this.text+this.tag)
  },
  transport: {
    type: String,
    lowercase: true,
    required: true,
    enum: TransportEngine.supported,
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
    default: null,
    lowercase: true,
    required: false,
  },
  urgent: {
    type: Boolean,
    default: false,
    required: false,
  },
  queued: {
    type: Number,
    default: null,
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