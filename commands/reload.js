module.exports.fn = async function () {
    if (this.command.author.id !== process.env.OWNER_ID) return await this.reply('This command is for the bot owner only. Fuk off.');

    await this.client.commands.reload();

    this.reply('Successfully reloaded commands.');
}