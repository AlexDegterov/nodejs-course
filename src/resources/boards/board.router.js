const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();
    res.json(boards);
  })
  .post(async (req, res) => {
    res.json(await boardsService.addBoard(new Board(req.body)));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    res.json(await boardsService.getBoardById(id));
  })
  .put(async (req, res) => {
    const { boardId } = req.params;
    const newBoardData = req.body;
    const updatedBoard = await boardsService.updateBoard(boardId, newBoardData);
    res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    res.json(await boardsService.deleteBoard(id));
  });

module.exports = router;
