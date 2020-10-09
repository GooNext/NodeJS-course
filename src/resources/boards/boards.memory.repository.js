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
  console.log(board);
  return memoryDB.boards.map((item, index) => {
    if (id === item.id) return (memoryDB.users[index] = board);
  });
};

module.exports = { getAll, get, create, update };
