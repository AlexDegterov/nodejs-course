const Board = require('./board.model');
const boards = require('./boards.db');
const { catchError } = require('../../helpers/error');

const getAll = catchError(async () => {
  return boards;
});

const getBoardById = catchError(id => {
  boards.find(board => {
    return board.id === id;
  });
});

const addBoard = catchError(boardData => {
  const addedBoard = new Board(boardData);
  boards.push(addedBoard);
  return addedBoard;
});

const updateBoardById = catchError((id, newData) => {
  let index;
  boards.map((board, i) => {
    if (board.id === id) index = i;
  });
  boards[index] = { ...boards[index], ...newData };
  return boards[index];
});

const deleteBoard = catchError(id => {
  let index;
  boards.map((board, i) => {
    if (board.id === id) index = i;
  });
  const deleteBoardInfo = boards.splice(index, 1);
  return deleteBoardInfo;
});

module.exports = {
  getAll,
  getBoardById,
  addBoard,
  updateBoardById,
  deleteBoard
};
