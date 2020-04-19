const Task = require('./task.model');
const { catchError } = require('../../helpers/error');

const getAll = catchError(async boardId => {
  const tasks = await Task.find({ boardId }).exec();
  return tasks;
});

const getTaskById = catchError(async (boardId, taskId) => {
  const task = await Task.findOne({ boardId, id: taskId }).exec();
  return task;
});

const deleteTask = catchError(async (boardId, taskId) => {
  return (await Task.deleteOne({ boardId, id: taskId })).deletedCount;
});

const updateTask = catchError(async (boardId, taskId, taskData) => {
  const tasks = await Task.updateOne({ boardId, id: taskId }, taskData).exec();
  return tasks.nModified;
});

const addTask = catchError(async (id, task) => {
  const data = { ...task, boardId: id };
  return Task.create(data);
});

const deleteAllTaskBoardId = catchError(async boardId => {
  return (await Task.deleteMany({ boardId })).deletedCount;
});

const unassignTask = catchError(async userId => {
  return await Task.updateMany({ userId }, { userId: null }).exec();
});

module.exports = {
  getAll,
  getTaskById,
  deleteTask,
  updateTask,
  addTask,
  unassignTask,
  deleteAllTaskBoardId
};
