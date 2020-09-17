module.exports.fn = async function () {
    return this.reply(`Pong! Discord gateway heartbeat took ${this.command.channel.guild.shard.latency}ms.`);
}

module.exports.aliases = ['pong']