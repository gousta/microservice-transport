const Transaction = require('../models/transaction')
const response = require('./response')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.json(response.success())
  })
  
  app.post('/transaction', (req, res) => {
    new Transaction(req.body)
      .save()
      .then((t) => res.json(response.success(t)))
      .catch((e) => res.json(response.error(e)))
  })

  app.get('/transaction/:identity', (req, res) => {
    Transaction
      .findOne({ _id: req.params.identity })
      .then((t) => res.json(response.success(t)))
      .catch((e) => res.json(response.error(e)))
  })

}