const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const addUser = user => usersRepo.addUser(user);
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
