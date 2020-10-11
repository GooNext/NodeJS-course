const router = require('express').Router();
const Tasks = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.status(200).send(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const tasks = await taskService.get(req.params.boardId, req.params.taskId);
  console.log(req.params);
  if (tasks) {
    res.status(200).send(tasks);
  } else {
    res.sendStatus(404);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = {
    ...req.body,
    id: req.params.taskId,
    boardId: req.params.boardId
  };
  const isUpdated = await taskService.update(task);
  if (isUpdated) {
    res.status(200).send(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = new Tasks({ ...req.body, boardId: req.params.boardId });
  await taskService.create(task);
  res.status(200).send(task);
});

router.route('/:boardId/tasks').delete(async (req, res) => {
  const task = await taskService.remove(req.params.boardId, req.params.taskId);
  if (task) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
