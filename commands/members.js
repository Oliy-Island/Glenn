module.exports.run = async function () {
    return this.reply(`**Member Count:** ${message.guild.members.cache.filter((m) => !m.bot).size.toLocaleString()}`);
}

module.exports.info = {
    aliases: ['members']
}
