/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const logger = require('./server/utils/logger');
const config = require('./server/config/config');
const appMiddleware = require('./server/middleware/appMiddlware');
const viewMiddleware = require('./server/middleware/viewMiddleware');
const errorHandlingMiddlware = require('./server/middleware/errorHandlingMiddlware');
const api = require('./server/api/api');

const app = express();

// set base directory to use viewMiddleware or any file in sub folder which wants to get app root folder
global.appRoot = __dirname;

// connect to mongoDB
// eslint-disable-next-line no-unused-vars
const db = mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.log('mongoDB is connected...');
  })
  .catch(err => {
    throw err;
  });

// setup the api
app.use('/api', [upload.any(), preStart()], api);

// setup the app middleware
appMiddleware(app);

// setup the api
app.use('/api', api);

// setup static serving
viewMiddleware(app);

// // example of serving  html page using view engine
// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Node JS Template',
//     list: ['Trung', 'Huynh']
//   });
// });

// example of serving  html page using view engine
app.get('/', (req, res) => {
  res.redirect('/api/docs/#/');
});

// set up global error handling here
errorHandlingMiddlware(app);

app.server = app.listen(config.port, () => {
  logger.log(`Running on port: ${chalk.green(config.port)}`);
});

// export the app for testing
module.exports = app;
