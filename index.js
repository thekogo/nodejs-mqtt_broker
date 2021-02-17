const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/mqtt',
  {
    auth: {
      authSource: 'admin',
    },
    user: 'root',
    pass: 'example',
    useNewUrlParser: true,
  });

require('./broker');
require('./api');
