const { logUnhandledRejection, logUncaughtException } = require('./logger');

function handleErrors(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.status).send({
    error: {
      status: err.status,
      message: err.message
    }
  });
  next(err);
}

function handleUncaughtException(err, origin) {
  logUncaughtException(err, origin);
}

function handleUnhandledPromiseRejection(reason) {
  logUnhandledRejection(reason);
}

module.exports = {
  handleErrors,
  handleUncaughtException,
  handleUnhandledPromiseRejection
};
