const os = require('os')

module.exports = {
  port: process.env.APP_PORT || 3000,
  mongoConnectionString: process.env.MONGO_URL || '',
  cluster: {
    count: process.env.APP_WEB_WORKERS || os.cpus().length,
    respawn: true,
    verbose: true,
  }
}