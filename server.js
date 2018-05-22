require('dotenv').config()

const express = require('express')
const cluster = require('express-cluster')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const configuration = require('./config')
const middleware = require('./app/http/middleware')


const apiWorker = (worker) => {
  mongoose
    .connect(configuration.mongoConnectionString)
    .then(() => {
      console.log(`Web worker started on pid ${worker.process.pid} (${worker.id}) with ${configuration.mongoConnectionString}`)
      const app = express()

      app.use(middleware.logger)
      app.use(middleware.authenticator)
      app.use(bodyParser.json())
      app.use(cors())
    
      require('./app/http/routes')(app)
    
      app.listen(configuration.port)
    })
    .catch((err) => {
      console.error('mongoose connection error', err.message)
    })
}

cluster(apiWorker, configuration.cluster)
