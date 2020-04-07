const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    if (tasks.length) res.json(tasks);
    else res.status(404).send('Tasks not found. Check ID');
  })
  .post(async (req, res) => {
    const addedTask = await taskService.addTask(req.body, req.params.boardId);
    res.json(addedTask);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const task = await taskService.getTaskById(
      req.params.boardId,
      req.params.id
    );
    if (task) res.json(task);
    else res.status(404).send('Task not found. Check ID');
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
