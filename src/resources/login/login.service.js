const loginRepo = require('./login.memory.repository');

const getLoginPasswordUser = (login, password) =>
  loginRepo.getLoginPasswordUser(login, password);

module.exports = { getLoginPasswordUser };
