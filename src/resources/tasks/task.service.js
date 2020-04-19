const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getTaskById = async (boardId, taskId) => {
  const tasks = await tasksRepo.getTaskById(boardId, taskId);
  return tasks;
};

const addTask = async (data, boardId) => {
  const task = await tasksRepo.addTask(boardId, data);
  return task;
};

const updateTask = async (boardId, taskId, updatedData) => {
  return await tasksRepo.updateTask(boardId, taskId, updatedData);
};

const deleteTaskById = async (boardId, taskId) => {
  const deletedTask = await tasksRepo.deleteTask(boardId, taskId);
  return deletedTask;
};

const deleteTaskByBoard = async (boardId, taskId) => {
  const deletedTask = await tasksRepo.deleteAllTaskBoardId(boardId, taskId);
  return deletedTask;
};

const unassignTask = idUser => tasksRepo.unassignTask(idUser);

module.exports = {
  getAll,
  getTaskById,
  addTask,
  updateTask,
  deleteTaskByBoard,
  deleteTaskById,
  unassignTask
};
