const Task = require('./task.model');
let tasks = require('./task.bd');

const getAll = boardId => {
  const tasksByBoardId = tasks.filter(task => {
    return task.boardId === boardId;
  });
  return tasksByBoardId;
};

const getTaskById = (boardId, taskId) => {
  const taskInfo = tasks.filter(task => {
    return task.boardId === boardId && task.id === taskId;
  });
  return taskInfo[0];
};

const deleteTask = (boardId, taskId) => {
  let index;
  tasks.map((task, i) => {
    if (task.boardId === boardId && task.id === taskId) index = i;
  });
  const deleteTaskInfo = tasks.splice(index, 1);
  return deleteTaskInfo;
};

const updateTask = (boardId, taskId, newData) => {
  let index;
  tasks.map((task, i) => {
    if (task.boardId === boardId && task.id === taskId) index = i;
  });
  tasks[index] = { ...tasks[index], ...newData };
  return tasks[index];
};

const addTask = (boardId, data) => {
  const addedTask = new Task({ ...data, boardId });
  tasks.push(addedTask);
  return addedTask;
};

const deleteAllTaskBoardId = boardId => {
  tasks = tasks.filter(task => {
    return task.boardId !== boardId;
  });
};

const unassignTask = idUser => {
  tasks.forEach(task => {
    if (task.userId === idUser) task.userId = null;
  });
};

module.exports = {
  getAll,
  getTaskById,
  deleteTask,
  updateTask,
  addTask,
  unassignTask,
  deleteAllTaskBoardId
};
