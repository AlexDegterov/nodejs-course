const tasksRepo = require('./task.memory.repository');
const getAll = () => tasksRepo.getAll();
const Task = require('./task.model');

let tasks = require('./task.bd');

const getByBoardId = async id => {
  return tasks.filter(({ boardId }) => boardId === id).map(Task.toResponse);
};

const getByBoardAndTaskId = async (boardId, taskId) => {
  return (
    tasks
      // .find(task => task.id === taskId && task.boardId === boardId)
      .find(task => {
        return task.id === taskId;
      })
      .map(Task.toResponse)
  );
};

const addTask = async taskData => {
  const task = new Task(taskData);
  tasks.push(task);
  return Task.toResponse(task);
};

const updateTask = async (boardId, taskId, updatedData) => {
  let updatedTask;
  tasks = tasks.map(task => {
    if (task.id === taskId && task.boardId === boardId) {
      updatedTask = { ...task, ...updatedData };
      return updatedTask;
    }
    return Task.toResponse(updatedTask);
  });
};

const deleteTask = async (boardId, taskId) => {
  tasks = tasks.filter(
    task => !(task.id === taskId && task.boardId === boardId)
  );
};

module.exports = {
  getAll,
  getByBoardId,
  getByBoardAndTaskId,
  addTask,
  updateTask,
  deleteTask
};
