const router = require('express').Router();
const boardService = require('./board.service');
const { Board } = require('./board.model');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(board => Board.toResponse(board)));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getBoard(req.params.id);
    if (board) res.status(200).send(Board.toResponse(board));
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
    const board = await boardService.createBoard(req.body);
    res.status(200).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.status(200).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    /*   while (TASKS.findIndex(task => task.boardId === req.params.id) + 1) {
      const index = TASKS.findIndex(task => task.boardId === req.params.id);
      taskService.deleteTask(req.params.id, TASKS[index].id);
    } */

    const message = await boardService.deleteBoard(req.params.id);
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
