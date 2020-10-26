const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const createUser = user => usersRepo.createUser(user);
const getUser = id => usersRepo.getUser(id);
const updateUser = (id, updatedUser) => usersRepo.updateUser(id, updatedUser);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
