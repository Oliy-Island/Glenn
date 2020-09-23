exports.run = async function () {
  return this.reply(`Pong! Discord gateway heartbeat took ${this.client.ws.ping}ms.`)
}

exports.info = {
  aliases: ['pong']
}
