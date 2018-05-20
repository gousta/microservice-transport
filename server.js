const express = require('express');
const cluster = require('express-cluster');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CPUamount = require('os').cpus().length;

const middleware = require('./app/http/middleware');

const configuration = {
  port: 3000,
  mongoConnectionString: 'mongodb://127.0.0.1:21234/transport',
  cluster: {
    count: CPUamount,
    respawn: true,
    verbose: true,
  }
}

const apiWorker = (worker) => {
  var app = express();

  app.use(middleware.requestLogger);
  app.use(bodyParser.json());
  app.use(cors());


  mongoose.connect(configuration.mongoConnectionString);

  require('./app/http/routes')(app);

  return app.listen(configuration.port);
}

cluster(apiWorker, configuration.cluster)
