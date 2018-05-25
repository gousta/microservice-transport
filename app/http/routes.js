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
    
    if(!queue.has(signature)) {
      Transaction
        .findOne({ signature: req.params.signature })
        .then((t) => {
          console.log('transaction lookup', t);
          if(!t) queue.push(new Transaction(req.body))
        })
    }

    res.json(response.success(signature))
  })

  app.get('/transaction/:signature', (req, res) => {
    Transaction
      .findOne({ signature: req.params.signature })
      .then((t) => res.json(response.success(t)))
      .catch((e) => res.json(response.error(e)))
  })

}