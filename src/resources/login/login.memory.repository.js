const { User } = require('../users/user.model');

const getLoginPasswordUser = async login => {
  const user = await User.findOne({ login });
  return user;
};

module.exports = {
  getLoginPasswordUser
};
