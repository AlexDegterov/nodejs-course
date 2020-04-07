let users = require('./user.db.js');

const getAll = async () => {
  return users;
};

const getUserById = async id => {
  const userInfo = users.find(user => {
    return user.id === id;
  });
  return userInfo;
};

const addUser = async user => {
  users.push(user);
  return user;
};

const updateUser = async (id, userData) => {
  users = users.map(user => {
    if (user.id === id) {
      return { id, ...userData };
    }
    return user;
  });
  return { id, ...userData };
};

const deleteUser = async id => {
  const userToDelete = users.find(usr => {
    return usr.id === id;
  });
  users = users.filter(user => {
    return user.id !== id;
  });
  return userToDelete;
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
