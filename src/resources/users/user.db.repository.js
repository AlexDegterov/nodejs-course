const { catchError } = require('../../helpers/error');
const User = require('./user.model');

const getAll = catchError(async () => {
  const users = await User.find({}).exec();
  return users;
});

const getUserById = catchError(async id => {
  const user = await User.findOne({ id }).exec();
  return user;
});

const addUser = catchError(async user => {
  return User.create(user);
});

const updateUser = catchError(async (id, userData) => {
  return User.updateOne({ id }, userData);
});

const deleteUser = catchError(async id => {
  return (await User.deleteOne({ id })).deletedCount;
});

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
