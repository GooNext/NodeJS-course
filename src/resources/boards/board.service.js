const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const createBoard = board => boardsRepo.createBoard(board);
const getBoard = id => boardsRepo.getBoard(id);
const updateBoard = (id, updatedBoard) =>
  boardsRepo.updateBoard(id, updatedBoard);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
