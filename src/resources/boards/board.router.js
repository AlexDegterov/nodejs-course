const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();
    res.json(boards);
  })
  .post(async (req, res) => {
    const addedBoard = await boardsService.addBoard(new Board(req.body));
    res.json(addedBoard);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoardById(req.params.id);
    if (board) res.json(board);
    else res.status(404).send('Board not found. Check ID');
  })
  .put(async (req, res) => {
    const updatedBoard = await boardsService.updateBoard(
      req.params.id,
      req.body
    );
    res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const deletedBoards = await boardsService.deleteBoard(req.params.id);
    res.json(deletedBoards);
  });

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
