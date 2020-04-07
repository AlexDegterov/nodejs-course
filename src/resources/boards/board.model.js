const uuid = require('uuid');
const Column = require('../columns/columns.model');

class Board {
  constructor({ id = uuid(), title = 'Title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column(column));
  }
}

module.exports = Board;
