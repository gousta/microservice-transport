const express = require('express')
const cluster = require('express-cluster')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const os = require('os')

const middleware = require('./app/http/middleware')

const configuration = {
  port: 3000,
  mongoConnectionString: 'mongodb://127.0.0.1:21234/transport',
  cluster: {
    count: os.cpus().length,
    respawn: true,
    verbose: true,
  }
}

const apiWorker = (worker) => {
  console.log(`Worker started on pid ${worker.process.pid} (${worker.id})`)

  mongoose
    .connect(configuration.mongoConnectionString)
    .then(() => {
      console.log('mongoose connected successfully')
    })
    .catch((err) => {
      console.error('mongoose connection error', err)
    })

  const app = express()

  app.use(middleware.logger)
  app.use(middleware.authenticator)
  app.use(bodyParser.json())
  app.use(cors())

  require('./app/http/routes')(app)

  return app.listen(configuration.port)
}

cluster(apiWorker, configuration.cluster)
