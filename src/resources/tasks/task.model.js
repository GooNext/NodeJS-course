const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      unique: false,
      required: true
    },
    order: {
      type: Number,
      unique: false,
      required: false
    },
    description: {
      type: String,
      unique: false,
      required: false
    },
    userId: {
      type: String,
      unique: false,
      required: false
    },
    boardId: {
      type: String,
      unique: false,
      required: false
    },
    columnId: {
      type: String,
      unique: false,
      required: false
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return {
    id: _id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task
};
