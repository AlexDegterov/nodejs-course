const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const addUser = userData => usersRepo.addUser(userData);
const getUserById = userId => usersRepo.getUserById(userId);
const updateUser = (userId, userData) => usersRepo.updateUser(userId, userData);
const deleteUser = async userId => {
  const resultDelete = await usersRepo.deleteUser(userId);
  if (resultDelete) await taskService.unassignTask(userId);
  return resultDelete;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
