const mongoose = require('mongoose');
const Transaction = require('../models/transaction')
const TransportEngine = require('../../transports/engine')
const response = require('./response')

module.exports = (app, queue) => {

  app.get('/', (req, res) => {
    res.json(response.success())
  })
  
  app.post('/transaction', (req, res) => {
    const signature = TransportEngine.signature(req.body)

    res.json(response.success(signature))

    if(queue.isUnique(signature)) {
      queue.push(signature, new Transaction(req.body))
    }
  })

  app.get('/transaction/:identity', (req, res) => {
    Transaction
      .findOne({ _id: req.params.identity })
      .then((t) => res.json(response.success(t)))
      .catch((e) => res.json(response.error(e)))
  })

}