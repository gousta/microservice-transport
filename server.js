require('dotenv').config()

const express = require('express')
const clusterStability = require('express-cluster-stability')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const middleware = require('./app/http/middleware')
const configuration = require('./config')
const queue = require('./app/queue/engine')

let delay = 1000;

const webWorker = (worker) => {
  console.log('[HTTP][WORKER] process started');
  mongoose
    .connect(configuration.mongoConnectionString)
    .then(webListener)
    .catch((err) => {
      console.error('mongoose connection error', err.message)
    })
}

const webMaster = () => {
  console.log('[HTTP][MASTER] process started');
}

const webListener = () => {
  const app = express()

  app.use(middleware.logger)
  app.use(middleware.authenticator)
  app.use(bodyParser.json())
  app.use(cors())

  require('./app/http/routes')(app, queue)

  app.listen(configuration.port)
  setInterval(queue.process, 4000)
}

clusterStability(webWorker, configuration.cluster, webMaster)
