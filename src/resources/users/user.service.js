const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const addUser = userData => usersRepo.addUser(userData);
const getUserById = idUser => usersRepo.getUserById(idUser);
const updateUser = (idUser, userData) => usersRepo.updateUser(idUser, userData);
const deleteUser = idUser => {
  usersRepo.deleteUser(idUser);
  taskService.unassignTask(idUser);
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
