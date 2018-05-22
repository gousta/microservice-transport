require('dotenv').config()

const moment = require('moment')
const mongoose = require('mongoose')
const configuration = require('./config')
const Transaction = require('./app/models/transaction')

mongoose
  .connect(configuration.mongoConnectionString)
  .then(() => {
    console.log('mongoose connected successfully')
  })
  .catch((err) => {
    console.error('mongoose connection error', err)
  })

const selectJob = {
  status: 'waiting',
}

const updateJob = {
  $set: {
    status: 'queued',
    queued: moment().unix(),
  }
}

const work = () => {
  console.log('work() called')
  
  Transaction
    .findOneAndUpdate(selectJob, updateJob, { new: true })
    .then((t) => {
      console.log('t', t)
    })
    .then(() => {
      setTimeout(work, 3000)
    })

}

work()