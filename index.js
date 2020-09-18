require('dotenv').config();

const Client = require('./structs/Client')

const client = new Client()

client.start()

module.exports = client // node debugging

