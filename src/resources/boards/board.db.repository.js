const Board = require('./board.model');
const { catchError } = require('../../helpers/error');

const getAll = catchError(async () => {
  const boards = await Board.find({}).exec();
  return boards;
});

const getBoardById = catchError(async id => {
  const board = await Board.findOne({ id }).exec();
  return board;
});

const addBoard = catchError(async board => {
  return await Board.create(board);
});

const updateBoardById = catchError(async (id, boardData) => {
  return await Board.updateOne({ id }, boardData);
});

const deleteBoard = catchError(async id => {
  return (await Board.deleteOne({ id })).deletedCount;
});

module.exports = {
  getAll,
  getBoardById,
  addBoard,
  updateBoardById,
  deleteBoard
};
