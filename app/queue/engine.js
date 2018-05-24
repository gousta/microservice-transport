
let queue = {}

exports.push = (key, data) => {
  queue[key] = data
  return queue[key]
}

exports.isUnique = (key) => {
  return queue[key] ? false : true
}

exports.process = () => {
  console.log('queue.process()', queue)
}