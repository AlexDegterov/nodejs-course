const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const { ErrorHandler, catchError } = require('../../helpers/error');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAllBoards();
      res.json(boards);
    })
  )
  .post(
    catchError(async (req, res) => {
      const addedBoard = await boardsService.addBoard(new Board(req.body));
      res.json(addedBoard);
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await boardsService.getBoardById(req.params.id);
      if (!board) throw new ErrorHandler(404, 'Board not found. Check ID');
      res.status(200).json(board);
    })
  )
  .put(
    catchError(async (req, res) => {
      const updatedBoard = await boardsService.updateBoard(
        req.params.id,
        req.body
      );
      if (!updatedBoard) {
        throw new ErrorHandler(404, 'Board not found. Check ID');
      }
      res.status(200).json(updatedBoard);
    })
  )
  .delete(
    catchError(async (req, res) => {
      const resultDeleteBoard = await boardsService.deleteBoard(req.params.id);
      if (!resultDeleteBoard) throw new ErrorHandler(404, 'Board not found');
      res.status(200).send(`Board ${req.params.id} was deleted successfully`);
    })
  );

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
