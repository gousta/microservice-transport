const _ = require('lodash')

let queue = {}

exports.push = (key, data) => {
  queue[key] = data
  return queue[key]
}

exports.isUnique = (key) => {
  return queue[key] ? false : true
}

exports.process = () => {
  // transaction.save().catch((e) => console.error(e))
  console.log('queue.process()', _.size(queue))
  
}