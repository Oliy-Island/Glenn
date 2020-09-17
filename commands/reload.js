module.exports.fn = async context => {
    if (context.msg.author.id !== process.env.OWNER_ID) return await context.reply('This command is for the bot owner only. Fuk off.');

    await context.client.commands.reload();

    context.reply('Successfully reloaded commands.');
}