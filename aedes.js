const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const { aedesPersistenceMongoDB } = require('aedes-persistence-mongodb')
const port = 1883

aedes.authenticate = function (client, username, password, callback) {
    callback(null, username === 'thekogo')
}

aedes.authorizePublish = function (client, packet, callback) {
    console.log(client.broker)
    if (packet.topic === 'aaaa') {
      return callback(new Error('wrong topic'))
    }
    callback(null)
}

aedesPersistenceMongoDB({
    url: 'mongodb://127.0.0.1/aedes-test', // Optional when you pass db object
    // Optional ttl settings
    ttl: {
        packets: 300, // Number of seconds
        subscriptions: 300,
    }
})

aedes.on('subscribe', (topic, client) => {
    // console.log(topic, client)
})

aedes.on('clientReady', (client) => {
    console.log('client connected id = ', client.id)
})

aedes.on('publish', (packet, client) => {
    console.log(`${packet.topic} = ${packet.payload.toString()}`)
})

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})