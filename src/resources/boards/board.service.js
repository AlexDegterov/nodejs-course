const boardsRepo = require('./board.memory.repository');
const boards = require('./boards.db');
const tasksService = require('../tasks/task.service');

const getAllBoards = () => {
  return boards;
};

const getBoardById = id => {
  const boardInfo = boards.find(board => {
    return board.id === id;
  });
  return boardInfo;
};

const addBoard = board => {
  boards.push(board);
  return board;
};

const updateBoard = (id, data) => boardsRepo.updateBoardById(id, data);

const deleteBoard = async id => {
  const deletedBoard = boardsRepo.deleteBoard(id);
  tasksService.deleteTaskByBoard(id);
  return deletedBoard;
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
