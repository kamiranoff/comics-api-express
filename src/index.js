import os from 'os';
import http from 'http';
import express from 'express';
import RoutesConfig from './config/routes.conf';
import DBConfig from './config/db.conf';
import Routes from './routes/index';

if ('production' === process.env.NODE_ENV)
  require('newrelic');

const PORT = process.env.PORT || 4444;
const app = express();

RoutesConfig.init(app, express);
DBConfig.init();
Routes.init(app, express.Router());

http.createServer(app)
  .listen(PORT, () => {
    console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
    console.log(`environment: ${process.env.NODE_ENV}`);
  });
