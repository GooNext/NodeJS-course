const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

const removeByBoardId = boardId => tasksRepo.removeByBoardId(boardId);

module.exports = { getAll, create, get, update, remove, removeByBoardId };
