require('dotenv').config()

const logger = require('./app/logger')
const express = require('express')
const clusterStability = require('express-cluster-stability')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const middleware = require('./app/http/middleware')
const configuration = require('./config')

const webWorker = () => {
  logger.info('[HTTP][WORKER] started')
  mongoose
    .connect(configuration.mongoConnectionString)
    .then(webListener)
    .catch((err) => {
      logger.error('[HTTP][WORKER][MONGODB][ERROR] connection', err.message)
    })
}

const webMaster = () => {
  logger.info('[HTTP][MASTER] started')
}

const webListener = () => {
  const app = express()

  app.use(middleware.logger)
  app.use(middleware.authenticator)
  app.use(bodyParser.json())
  app.use(cors())

  require('./app/http/routes')(app)

  app.listen(configuration.port)
}

clusterStability(webWorker, configuration.cluster, webMaster)
