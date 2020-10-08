const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = id => usersRepo.remove(id);

const save = user => usersRepo.save(new User(user));

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

module.exports = { getAll, get, remove, save, create, update };
