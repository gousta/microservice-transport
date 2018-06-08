const Controller = require('../Controller')

module.exports = (app) => {
  app.get('/', Controller.index)

  app.post('/transaction', Controller.newTransaction)
  app.get('/transaction/:signature', Controller.getTransaction)
}