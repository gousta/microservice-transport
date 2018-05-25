
module.exports = {
  port: process.env.APP_WEB_PORT || 3000,
  mongoConnectionString: (process.env.MONGO_URL || 'mongodb://127.0.0.1:27017') + '/transport',
  cluster: {
    logLevel: 'error',
    handleUncaughtException: true,
    numberOfWorkers: process.env.APP_WEB_WORKERS || 1,
  }
}