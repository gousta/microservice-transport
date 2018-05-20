const express = require('express');
const cluster = require('express-cluster');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CPUamount = require('os').cpus().length;

const middleware = require('./app/http/middleware');

cluster((worker) => {
  var app = express();

  app.use(middleware.requestLogger);
  app.use(bodyParser.json());
  app.use(cors());


  mongoose.connect('mongodb://127.0.0.1:21234/transport');

  require('./app/http/routes')(app);

  return app.listen(3000);
}, { count: CPUamount, respawn: true, verbose: true })
