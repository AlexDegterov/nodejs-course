const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const { ErrorHandler } = require('../../helpers/error');

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
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.getBoardById(req.params.id);
      if (board) res.json(board);
      else throw new ErrorHandler(404, 'Board not found. Check ID');
    } catch (error) {
      next(error);
    }
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
