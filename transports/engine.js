const crypto = require('crypto')
const Test = require('./test/transport')


exports.supported = [
  'test',
  'email',
  'sms',
]


exports.signature = (input) => {
  return crypto
    .createHash('md5')
    .update(String('#' + input))
    .digest('hex')
}

exports.transport = () => {
  
}