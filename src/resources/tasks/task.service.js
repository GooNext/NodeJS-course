const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);
const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);
const updateTask = (boardId, taskId, updatedTask) =>
  tasksRepo.updateTask(boardId, taskId, updatedTask);
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
