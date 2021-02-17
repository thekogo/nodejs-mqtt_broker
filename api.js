/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersRouter');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(5000, () => console.log('server start on port 5000'));
