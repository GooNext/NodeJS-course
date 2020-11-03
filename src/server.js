const { PORT } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('◙ connected to DB ◙');
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
