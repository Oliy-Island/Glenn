module.exports.run = async function (message) {
    if (message.author.id !== this.client.config.owner) return this.error('This command is for the bot owner only. Fuk off.');

    await this.client.commands.load();

    this.reply('Successfully reloaded commands.');
}

module.exports.info = {
    level: 'developer'
}