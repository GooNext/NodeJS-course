const mongoose = require('mongoose');
const { Schema } = mongoose;

const columnSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      require: false
    },
    title: {
      type: String,
      unique: false,
      required: true
    },
    order: {
      type: Number,
      unique: false,
      required: false
    }
  },
  { versionKey: false, _id: false }
);

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: false,
      required: true
    },
    columns: [columnSchema]
  },
  { versionKey: false, _id: false }
);
boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = {
  Board
};
