module.exports.run = async function () {
    return this.reply(`**Member Count:** ${this.client.guild.members.cache.filter((m) => !m.bot).size.toLocaleString()}`);
}
