const logger = require('../logger')

exports.logger = (req, res, next) => {
  logger.log(req.method, req.originalUrl)
  next()
}

exports.authenticator = (req, res, next) => {
  next()
}
