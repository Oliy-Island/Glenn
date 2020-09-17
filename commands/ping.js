module.exports.fn = async context => {
    await context.reply(`Pong! Discord gateway heartbeat took ${context.command.channel.guild.shard.latency}ms.`);
}

module.exports.aliases = ['pong']