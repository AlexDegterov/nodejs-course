const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { appLogger, logger } = require('./helpers/logger');
const { internalServerError, handleError } = require('./helpers/error');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(appLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection ', reason, promise);
});

process.on('uncaughtException', error => {
  logger.error('Uncaught error ', error);
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'))

app.use((err, req, res, next) => {
  if (err.statusCode) {
    handleError(err, res);
    return;
  }
  next(err);
});

app.use((err, req, res, next) => {
  internalServerError(req, res);
});

module.exports = app;
