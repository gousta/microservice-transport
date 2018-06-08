require('dotenv').config()

const logger = require('./app/logger')
const moment = require('moment')
const mongoose = require('mongoose')
const configuration = require('./config')
const Transaction = require('./app/models/transaction')

mongoose
  .connect(configuration.mongoConnectionString)
  .then(() => {
    logger.log('mongoose connected successfully')
  })
  .catch((err) => {
    logger.error('mongoose connection error', err)
  })

  const selectJob = {
  queued: null
}

const updateJob = {
  $set: {
    queued: moment().unix()
  }
}

const work = () => {
  logger.log('work() called')

  Transaction
    .findOneAndUpdate(selectJob, updateJob, {new: true})
    .then((t) => {
      logger.log('t', t)
    })
    .then(() => {
      setTimeout(work, 3000)
    })

}

work()