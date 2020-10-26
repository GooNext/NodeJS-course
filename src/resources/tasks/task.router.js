const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service');
const boardService = require('../boards/board.service');
const { Task } = require('./task.model');

router.route('/').get(async (req, res, next) => {
  try {
    const board = await boardsService.getBoard(req.params.boardId);

    if (board) {
      const tasks = await tasksService.getAll(req.params.boardId);
      res.json(tasks.map(task => Task.toResponse(task)));
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.getTask(
      req.params.boardId,
      req.params.taskId
    );

    if (task) res.status(200).send(Task.toResponse(task));
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const task = await tasksService.createTask(req.params.boardId, req.body);
    const board = await boardService.getBoard(req.params.boardId);
    if (board) res.status(200).send(Task.toResponse(task));
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) res.status(200).send(Task.toResponse(task));
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const message = await tasksService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );

    if (message) res.status(204).send(message);
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
