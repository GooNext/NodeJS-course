const { Task } = require('../tasks/task.model');
const { Board } = require('./board.model');
const uuid = require('uuid');

const getAll = async () => {
  const boards = await Board.find({});

  return boards;
};

const createBoard = async board => {
  board.columns.forEach(column => (column.id = uuid()));
  const createdBoard = await new Board(board);
  await createdBoard.save();

  return createdBoard;
};

const getBoard = async id => {
  const board = await Board.findById(id);

  return board;
};

const updateBoard = async (id, updatedBoard) => {
  const board = await Board.findByIdAndUpdate(id, updatedBoard, { new: true });

  return board;
};

const deleteBoard = async id => {
  await Task.deleteMany({ boardId: id });
  await Board.findByIdAndDelete(id);

  return "Board and it's tasks have been deleted";
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
