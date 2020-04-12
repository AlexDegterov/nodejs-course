const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { ErrorHandler } = require('../../helpers/error');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await taskService.getAll(req.params.boardId);
      if (tasks.length) res.json(tasks);
      else throw new ErrorHandler(404, 'Tasks not found. Check ID');
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res) => {
    const addedTask = await taskService.addTask(req.body, req.params.boardId);
    res.json(addedTask);
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const task = await taskService.getTaskById(
        req.params.boardId,
        req.params.id
      );
      if (task) res.json(task);
      else throw new ErrorHandler(404, 'Task not found. Check ID');
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res) => {
    const updatedTask = await taskService.updateTask(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(updatedTask);
  })
  .delete(async (req, res) => {
    await taskService.deleteTaskById(req.params.boardId, req.params.id);
    res.send(`Task ${req.params.id} was deleted`);
  });

module.exports = router;
