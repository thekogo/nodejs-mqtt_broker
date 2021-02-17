const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/mqtt',
  {
    auth: {
      authSource: 'admin',
    },
    user: process.env.MONGO_USER || 'root',
    pass: process.env.MONGO_PASSWORD || 'example',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  });

require('./broker');
require('./api');
