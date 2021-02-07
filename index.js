const mosca = require("mosca");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mqtt', 
    {
        auth: {
            "authSource": "admin"
        },
        user: "root",
        pass: "example",
        useNewUrlParser: true,
    });
// import database model
const User = require('./model/User');
const Data = require('./model/Data');

const settings = {
    port: 1883
};

const broker = new mosca.Server(settings);

broker.authenticate = async (client, username, password, callback) => {
    try {
        const user = await User.findOne({username: username}).lean();

        var authorized = (username === user.username && password.toString() === user.password);
        if (authorized) client.user = username;
        callback(null, authorized);
    } catch {
        callback(null, false);
    }
}

broker.on('ready', () => {
  console.log("ready");
});

broker.on('published', async (packet, client) => {
    console.log('==========================================')
    console.log(packet)
    if(client) {
        console.log('client id =>' + client.id)
        console.log(`${client.user} => ${packet.payload.toString()}`)
        try {
            await Data.create({
                topic: packet.topic,
                payload: packet.payload.toString(),
                username: client.user,
                client_id: client.id
            });
        } catch(err) {
            console.log(err)
        }
    }
    console.log('==========================================')
})