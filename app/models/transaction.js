const mongoose = require('mongoose');
const { transports } = require('../../transports/kernel');

// Schema
var TransactionSchema = mongoose.Schema({
  transport: {
    type: String,
    required: [true, 'transport is not defined']
  },
  from: String,
  to: String,
  text: String,
  tag: String,
  urgent: Boolean,
  created: {
    type: Date,
    default: Date.now
  },
});

// Methods
TransactionSchema.methods.isValid = () => {
  console.log('isValid', this);
  console.log(transports.indexOf(this.transport), this.transport);
  if(transports.indexOf(this.transport) !== -1) {
    return false;
  }

  return true;
}

// Export
module.exports = mongoose.model('Transaction', TransactionSchema);