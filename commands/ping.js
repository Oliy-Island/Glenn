module.exports.run = async function () {
    return this.reply(`Pong! Discord gateway heartbeat took ${this.client.ws.ping}ms.`);
}

module.exports.info = {
    aliases: ['pong']
}