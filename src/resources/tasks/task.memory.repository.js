const Task = require('./task.model');
let tasks = require('./task.bd');
const { catchError } = require('../../helpers/error');

const getAll = catchError(boardId => {
  const tasksByBoardId = tasks.filter(task => {
    return task.boardId === boardId;
  });
  return tasksByBoardId;
});

const getTaskById = catchError((boardId, taskId) => {
  const taskInfo = tasks.filter(task => {
    return task.boardId === boardId && task.id === taskId;
  });
  return taskInfo[0];
});

const deleteTask = catchError((boardId, taskId) => {
  let index;
  tasks.map((task, i) => {
    if (task.boardId === boardId && task.id === taskId) index = i;
  });
  const deleteTaskInfo = tasks.splice(index, 1);
  return deleteTaskInfo;
});

const updateTask = catchError((boardId, taskId, newData) => {
  let index;
  tasks.map((task, i) => {
    if (task.boardId === boardId && task.id === taskId) index = i;
  });
  tasks[index] = { ...tasks[index], ...newData };
  return tasks[index];
});

const addTask = catchError((boardId, data) => {
  const addedTask = new Task({ ...data, boardId });
  tasks.push(addedTask);
  return addedTask;
});

const deleteAllTaskBoardId = catchError(boardId => {
  tasks = tasks.filter(task => {
    return task.boardId !== boardId;
  });
});

const unassignTask = catchError(idUser => {
  tasks.forEach(task => {
    if (task.userId === idUser) task.userId = null;
  });
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
