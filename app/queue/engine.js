const _ = require('lodash')
const Transaction = require('../models/transaction')

let queue = []

exports.push = (data) => {
  queue.push(data)
}

exports.has = (key) => {
  return queue.findIndex((x) => x.signature === key) !== -1
}

exports.process = () => {
  // transaction
  console.log('queue.process()')

  const pull50 = _.pullAt(queue, [0, 50]);

  Transaction
    .insertMany(pull50)
    .then((res) => {
      console.log('insertMany', res);
    })

  queue = [];
}