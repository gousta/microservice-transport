
exports.logger = (req, res, next) => {
  console.log(req.method, req.originalUrl)
  next()
}

exports.authenticator = (req, res, next) => {
  next()
}