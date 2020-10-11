const memoryDB = require('../../common/memoryDB');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return memoryDB.users;
};

const get = async id => {
  return memoryDB.users.find(el => el.id === id);
};

const create = async user => {
  return memoryDB.users.push(user);
};

const update = async user => {
  const { id } = user;
  return memoryDB.users.map((item, index) => {
    if (id === item.id) return (memoryDB.users[index] = user);
  });
};

const remove = async id => {
  const index = memoryDB.users.findIndex(el => el.id === id);
  if (index > -1) {
    memoryDB.users = memoryDB.users.filter(e => e.id !== id);
    return true;
  }
  return null;
};

module.exports = { getAll, get, create, update, remove };
