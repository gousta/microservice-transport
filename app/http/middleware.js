
exports.logger = (req, res, next) => {
  console.log(req.method, req.originalUrl);
  console.log('Passing through logger middleware');
  next();
}

exports.authenticator = (req, res, next) => {
  console.log('Passing through authenticator middleware');
  next();
}