const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
