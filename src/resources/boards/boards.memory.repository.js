const memoryDB = require('../../common/memoryDB');

const getAll = async () => {
  return memoryDB.boards;
};

const get = async id => {
  return memoryDB.boards.find(el => el.id === id);
};

const create = async board => {
  return memoryDB.boards.push(board);
};

const update = async board => {
  const { id } = board;
  const index = memoryDB.boards.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.boards = [
      ...memoryDB.boards.slice(0, index),
      board,
      ...memoryDB.boards.slice(index + 1)
    ];
    return true;
  }
  return false;
};

const remove = async id => {
  const index = memoryDB.boards.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.boards = memoryDB.boards.filter(e => e.id !== id);
    return true;
  }
  return false;
};

module.exports = { getAll, get, create, update, remove };
