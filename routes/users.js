const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mqtt',
  {
    auth: {
      authSource: 'admin',
    },
    user: 'root',
    pass: 'example',
    useNewUrlParser: true,
    poolSize: 5,
  });
// import database model
const User = require('../model/User');
// const Data = require('./model/Data');

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.status(200).send(users);
});

app.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

app.put('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    user.password = password;
    await user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

app.delete('/', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.deleteOne({ username });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = app;
