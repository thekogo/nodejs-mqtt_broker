const mosca = require('mosca');

// import database model
const User = require('./model/User');
const Data = require('./model/Data');

const settings = {
  port: 1883,
};

const broker = new mosca.Server(settings);

broker.authenticate = async (client, username, password, callback) => {
  try {
    const user = await User.findOne({ username }).lean();

    const authorized = (username === user.username && password.toString() === user.password);
    if (authorized) client.user = username;
    callback(null, authorized);
  } catch {
    callback(null, false);
  }
};

broker.on('ready', () => {
  console.log('ready');
});

broker.on('published', async (packet, client) => {
  console.log('==========================================');
  console.log(packet);
  if (client) {
    console.log(`client id =>${client.id}`);
    console.log(`${client.user} => ${packet.payload.toString()}`);
    try {
      await Data.create({
        topic: packet.topic,
        payload: packet.payload.toString(),
        username: client.user,
        client_id: client.id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  console.log('==========================================');
});
