const boardsRepo = require('./boards.memory.repository');
const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const save = board => boardsRepo.save(new Board(board));

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

const remove = id => {
  const isBoardDeleted = boardsRepo.remove(id);
  if (isBoardDeleted) {
    tasksService.removeByBoardId(id);
  }
  return isBoardDeleted;
};

module.exports = { getAll, get, remove, save, create, update };
