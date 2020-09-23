require('dotenv').config()

const Client = require('./structs/Client')

const client = new Client()

require('./utils/StructureUpdates')(client)

client.start()

module.exports = client // node debugging
