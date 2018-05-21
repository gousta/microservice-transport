const os = require('os')

module.exports = {
  port: 3000,
  mongoConnectionString: 'mongodb://127.0.0.1:21234/transport',
  cluster: {
    count: os.cpus().length,
    respawn: true,
    verbose: true,
  }
}