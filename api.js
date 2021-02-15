/* eslint-disable linebreak-style */
const express = require('express');

const app = express();

app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(5001, () => console.log('server start on port 5000'));
