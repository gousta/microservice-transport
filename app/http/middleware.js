const logger = require('../../logger')

exports.logger = (req, res, next) => {
  logger.info(`[${req.method}] ${req.originalUrl}`)
  next()
}

exports.authenticator = (req, res, next) => {
  next()
}
