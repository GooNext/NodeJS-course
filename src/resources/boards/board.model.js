const { v4: uuid } = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => ({ ...column, id: uuid() }));
  }
}

module.exports = Board;
