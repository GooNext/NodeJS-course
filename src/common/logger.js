const winston = require('winston');

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.simple()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: './src/common/logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: './src/common/logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
  exitOnError: false
});

function logRequest(req, res, next) {
  const date = new Date();

  if (req.body.password) {
    // hide sensitive data
    Object.defineProperty(req.body, 'password', {
      enumerable: false,
      value: req.body.password
    });
  }

  winstonLogger.log(
    'info',
    `
    TIME: ${date.toString()}
    TYPE: ${req.method}
    URL: ${req.originalUrl}
    QUERY PARAMS: ${JSON.stringify(req.query)}
    BODY: ${
      req.method === 'POST' || req.method === 'PUT'
        ? JSON.stringify(req.body)
        : `no body for ${req.method}`
    }
`
  );

  if (req.body.password) {
    Object.defineProperty(req.body, 'password', {
      enumerable: true,
      value: req.body.password
    });
  }

  next();
}

function logError(error, req, res, next) {
  const date = new Date();

  winstonLogger.log(
    'error',
    `
    TIME: ${date.toString()}
    TYPE: ${req.method}
    URL: ${req.originalUrl}
    BODY: ${
      req.method === 'POST' || req.method === 'PUT'
        ? JSON.stringify(req.body)
        : `no body for ${req.method}`
    }
    ERROR STATUS: ${error.status}
    ERROR MESSAGE: ${error.message}
    ERROR DETAILS:
    ${error.stack}
    `
  );
  next();
}

function logUnhandledRejection(err) {
  const date = new Date();

  winstonLogger.log(
    'error',
    `
  TIME: ${date.toString()}
  ERROR: ${err}
  ERROR PROMISE REJECTION DETAILS: ${err.stack}`
  );
}

function logUncaughtException(err, origin) {
  const date = new Date();

  winstonLogger.log(
    'error',
    `
  TIME: ${date.toString()}
  ERROR: ${err}
  ERROR TYPE: ${origin}
  ERROR DETAILS:
  ${err.stack}
  `
  );
}

module.exports = {
  logRequest,
  logError,
  logUnhandledRejection,
  logUncaughtException,
  winstonLogger
};
