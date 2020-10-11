const uuid = require('uuid');

class Tasks {
  // eslint-disable-next-line prettier/prettier
  constructor({ id = uuid(), title, order, description, userId, boardId, columnId } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Tasks;
