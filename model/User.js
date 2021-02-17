const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'user' },
);

User.index({ username: 1 }, { unique: true });

const UserModel = mongoose.model('User', User);
module.exports = UserModel;
