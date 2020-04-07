const Board = require('./board.model');
const boards = require('./boards.db');

const getAll = async () => {
  return boards;
};

const getBoardById = id => {
  boards.find(board => {
    return board.id === id;
  });
};

const addBoard = boardData => {
  const addedBoard = new Board(boardData);
  boards.push(addedBoard);
  return addedBoard;
};

const updateBoardById = (id, newData) => {
  let index;
  boards.map((board, i) => {
    if (board.id === id) index = i;
  });
  boards[index] = { ...boards[index], ...newData };
  return boards[index];
};

const deleteBoard = id => {
  let index;
  boards.map((board, i) => {
    if (board.id === id) index = i;
  });
  const deleteBoardInfo = boards.splice(index, 1);
  return deleteBoardInfo;
};

module.exports = {
  getAll,
  getBoardById,
  addBoard,
  updateBoardById,
  deleteBoard
};
