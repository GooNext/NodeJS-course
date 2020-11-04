const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const { logRequest, logError } = require('./common/logger');
const {
  handleErrors,
  handleUncaughtException,
  handleUnhandledPromiseRejection
} = require('./common/error-handler');
const logAuth = require('./common/logAuth');

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

app.use(logRequest);

app.use('/login', loginRouter);
app.use('/users', logAuth, userRouter);
app.use('/boards', logAuth, boardRouter);
app.use('/boards/:boardId/tasks', logAuth, taskRouter);

app.use(handleErrors, logError);

process
  .on('unhandledRejection', reason => {
    handleUnhandledPromiseRejection(reason);
  })
  .on('uncaughtException', (err, origin) => {
    handleUncaughtException(err, origin);
  });

module.exports = app;
