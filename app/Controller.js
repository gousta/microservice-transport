const Transaction = require('./models/transaction')
const TransportEngine = require('../transports/engine')
const response = require('./http/response')

exports.index = (req, res) => {
  res.json(response.success())
}

exports.newTransaction = (req, res) => {
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
}

exports.getTransaction = (req, res) => {
  Transaction
    .findOne({signature: req.params.signature})
    .then((t) => res.json(response.success(t)))
    .catch((e) => res.json(response.error(e)))
}