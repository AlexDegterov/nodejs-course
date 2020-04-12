const httpStatus = require('http-status-codes');
const { logger } = require('./logger');

class ErrorHandler extends Error {
  constructor(statusCode = httpStatus.BAD_REQUEST, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode = httpStatus.BAD_REQUEST, message, error } = err;
  res.status(statusCode).json({
    errors: error,
    statusCode,
    message
  });
};

const catchError = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

const internalServerError = (req, res) => {
  const errCode = httpStatus.INTERNAL_SERVER_ERROR;
  logger.error(httpStatus.getStatusText(errCode), req);
  res.status(errCode).send(httpStatus.getStatusText(errCode));
};

module.exports = { ErrorHandler, handleError, catchError, internalServerError };
