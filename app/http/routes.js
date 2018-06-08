const Transaction = require('../models/transaction')
const TransportEngine = require('../../transports/engine')
const response = require('./response')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.json(response.success())
  })

  app.post('/transaction', (req, res) => {
    const signature = TransportEngine.signature(req.body)

    Transaction
      .findOne({signature: signature})
      .then((t) => {
        if (!t) {
          t = new Transaction(req.body)
          t.save()
        }

        res.json(response.success(t))
      })

  })

  app.get('/transaction/:signature', (req, res) => {
    Transaction
      .findOne({signature: req.params.signature})
      .then((t) => res.json(response.success(t)))
      .catch((e) => res.json(response.error(e)))
  })

}