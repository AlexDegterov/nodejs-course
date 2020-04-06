const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const id = req.params.boardId;
    const tasks = await taskService.getByBoardId(id);
    res.send(tasks);
  })
  .post(async (req, res) => {
    const id = req.params.boardId;
    const addedTask = await taskService.addTask(req.body, id);
    res.json(addedTask);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const taskId = req.params.id;
    const boardId = req.params.boardId;
    res.json(await taskService.getByBoardAndTaskId(boardId, taskId));
  })
  .put(async (req, res) => {
    const taskId = req.params.taskId;
    const boardId = req.params.boardId;
    res.json(await taskService.updateTask(boardId, taskId, req.body));
  })
  .delete(async (req, res) => {
    const taskId = req.params.taskId;
    const boardId = req.params.boardId;
    await taskService.deleteTask(boardId, taskId);
    res.send(`Task ${taskId} was deleted`);
  });

module.exports = router;
