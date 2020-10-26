const { Task } = require('./task.model');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });

  return tasks;
};

const createTask = async (boardId, task) => {
  task.boardId = boardId;
  const createdTask = await new Task(task);
  await createdTask.save();

  return createdTask;
};

const getTask = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });

  return task;
};

const updateTask = async (boardId, taskId, updatedTask) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, boardId },
    updatedTask,
    { new: true }
  );

  return task;
};

const deleteTask = async (boardId, taskId) => {
  await Task.findOneAndDelete({ _id: taskId, boardId });
  return 'Task has been deleted';
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
