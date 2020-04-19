const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { ErrorHandler, catchError } = require('../../helpers/error');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const tasks = await taskService.getAll(req.params.boardId);
      if (!tasks.length) {
        throw new ErrorHandler(404, 'Tasks not found. Check ID');
      }
      res.status(200).json(tasks);
    })
  )
  .post(
    catchError(async (req, res) => {
      const addedTask = await taskService.addTask(req.body, req.params.boardId);
      res.status(200).json(addedTask);
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const task = await taskService.getTaskById(
        req.params.boardId,
        req.params.id
      );
      if (!task) {
        throw new ErrorHandler(404, 'Task not found. Check ID');
      }
      res.status(200).json(task);
    })
  )
  .put(
    catchError(async (req, res) => {
      const updatedTask = await taskService.updateTask(
        req.params.boardId,
        req.params.id,
        req.body
      );
      if (!updatedTask) throw new ErrorHandler(404, 'Task not found');
      res.status(200).json(`Task ${req.params.id} was updated successfully`);
    })
  )
  .delete(
    catchError(async (req, res) => {
      const resultDeleteTask = await taskService.deleteTaskById(
        req.params.boardId,
        req.params.id
      );
      if (!resultDeleteTask) throw new ErrorHandler(404, 'Task not found');
      res.status(200).send(`Task ${req.params.id} was deleted successfully`);
    })
  );

module.exports = router;
