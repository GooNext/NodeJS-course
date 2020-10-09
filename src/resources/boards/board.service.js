const boardsRepo = require('./boards.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const remove = id => boardsRepo.remove(id);

const save = board => boardsRepo.save(new Board(board));

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

module.exports = { getAll, get, remove, save, create, update };
