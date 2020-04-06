const boardsRepo = require('./board.memory.repository');
let boards = require('./boards.db');

const getAllBoards = () => {
  return boards;
};

const getBoardById = id => {
  const board = boards.find(board => {
    return board.id === id;
  });
  return board;
};

const addBoard = board => {
  boards.push(board);
  return board;
};

const updateBoard = (id, boardData) => {
  boards = boards.map(board => {
    if (board.id === id) {
      return { ...board, ...boardData };
    }
    return board;
  });
  return { id, ...boardData };
};

const deleteBoard = async id => {
  const boardToDelete = boards.find(board => {
    return board.id === id;
  });
  boards = boards.filter(board => {
    return board.id !== id;
  });
  return boardToDelete;
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
