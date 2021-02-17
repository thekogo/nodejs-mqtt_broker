const User = require('../model/User');

const getUsers = async (req, res) => {
  const users = await User.find().lean();
  res.status(200).send(users);
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    user.password = password;
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ status: 'error' });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.deleteOne({ username });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ status: 'error' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
