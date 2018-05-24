const mongoose = require('mongoose');
const Transaction = require('../models/transaction')
const response = require('./response')

const queue = global.queue

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.json(response.success())
  })
  
  app.post('/transaction', (req, res) => {
    const transaction = new Transaction(req.body);

    if(queue.isUnique(transaction.signature)) {
      // Add to queue
      queue.push(transaction.signature, transaction);
    }

    res.json(response.success(transaction));

    console.log('ok now running this');
    
    transaction.save().catch((e) => console.error(e))
  })

  app.get('/transaction/:identity', (req, res) => {
    Transaction
      .findOne({ _id: req.params.identity })
      .then((t) => res.json(response.success(t)))
      .catch((e) => res.json(response.error(e)))
  })

}