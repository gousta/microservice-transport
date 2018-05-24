const os = require('os')

module.exports = {
  port: process.env.APP_PORT || 3000,
  mongoConnectionString: (process.env.MONGO_URL || 'mongodb://127.0.0.1:27017') + '/transport',
  cluster: {
    count: process.env.APP_WEB_WORKERS || os.cpus().length,
    respawn: true,
    verbose: true,
  }
}