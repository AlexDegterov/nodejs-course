const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAllBoards = () => boardsRepo.getAll();

const getBoardById = idBoard => boardsRepo.getBoardById(idBoard);

const addBoard = board => boardsRepo.addBoard(board);

const updateBoard = (id, data) => boardsRepo.updateBoardById(id, data);

const deleteBoard = async id => {
  const deletedBoard = await boardsRepo.deleteBoard(id);
  if (deletedBoard) await tasksService.deleteTaskByBoard(id);
  return deletedBoard;
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
