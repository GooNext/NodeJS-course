const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { logRequest, logError } = require('./common/logger');
const {
  handleErrors,
  handleUncaughtException,
  handleUnhandledPromiseRejection
} = require('./common/error-handler');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('----- connected to DB -----');
});
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// request logger
app.use(logRequest);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

// error logger and handler
app.use(handleErrors, logError);

process
  .on('unhandledRejection', reason => {
    handleUnhandledPromiseRejection(reason);
  })
  .on('uncaughtException', (err, origin) => {
    handleUncaughtException(err, origin);
  });

// throw Error('Oops EXCEPTION!!!!!!!');
// Promise.reject(Error('Oops PROMISE REJECTION!'));

module.exports = app;
