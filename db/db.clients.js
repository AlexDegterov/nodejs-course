const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/resources/users/user.model');
const Board = require('../src/resources/boards/board.model');
const Task = require('../src/resources/tasks/task.model');
const bcrypt = require('bcrypt');
const salt = 10;

dotenv.config({
  path: path.join(__dirname, '../.env')
});

// eslint-disable-next-line no-sync
const passwordAdminHash = bcrypt.hashSync('admin', salt);

const users = [
  new User({
    name: 'Alex',
    login: 'admin',
    password: passwordAdminHash,
    id: 'u1-uuu'
  })
];

const boards = [
  new Board({
    id: '11h3aj',
    title: 'Доска 1',
    columns: [
      { title: 'Колонка 1', order: 0, id: 'col1-ffff' },
      { title: 'Колонка 2', order: 1, id: 'col2-ffff' }
    ]
  }),
  new Board({
    id: '22h3aj',
    title: 'Доска 2',
    columns: [
      { title: 'Колонка 3', order: 0, id: 'col3-ffff' },
      { title: 'Колонка 4', order: 1, id: 'col4-ffff' }
    ]
  })
];

const tasks = [
  new Task({
    title: 'Задача №1',
    order: 0,
    description: 'Описание задачи №1',
    userId: 'u1-uuu',
    boardId: '11h3aj',
    columnId: 'col1-ffff'
  }),
  new Task({
    title: 'Задача №2',
    order: 1,
    description: 'Описание задачи №2',
    userId: 'u1-uuu',
    boardId: '22h3aj',
    columnId: 'col4-ffff'
  }),
  new Task({
    title: 'Задача №3',
    order: 1,
    description: 'Описание задачи №3',
    userId: 'u2-uuu',
    boardId: '22h3aj',
    columnId: 'col4-ffff'
  })
];

const connectToDb = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
  });

  callback();
};

module.exports = { connectToDb };
