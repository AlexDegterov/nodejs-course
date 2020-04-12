const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/info.log'),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/exceptions.log'),
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

logger.exitOnError = true;

const appLogger = (req, res, next) => {
  const { url, query, body } = req;
  logger.info('Request was logged', { url, query, body });
  next();
};

module.exports = { appLogger, logger };
