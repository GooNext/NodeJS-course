const { Task } = require('../tasks/task.model');
const { User } = require('./user.model');

const getAll = async () => {
  // throw new Error(); //error 500
  const users = await User.find({});

  return users;
};

const createUser = async user => {
  const createdUser = await new User(user);
  await createdUser.save();

  return createdUser;
};

const getUser = async id => {
  const user = await User.findById(id);

  return user;
};

const updateUser = async (id, updatedUser) => {
  const user = await User.findOneAndUpdate({ _id: id }, updatedUser, {
    new: true
  });

  return user;
};

const deleteUser = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
  await User.findByIdAndDelete(id);

  return 'User and user tasks have been deleted';
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
