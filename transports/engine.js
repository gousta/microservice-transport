const crypto = require('crypto')
const Test = require('./test/transport')


exports.supported = [
  'test',
  'email',
  'sms',
]


exports.signature = (obj) => {
  const string = String('@'+obj.transport+obj.from+obj.to+obj.text+obj.tag)
  
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex')
}

exports.transport = () => {
  
}