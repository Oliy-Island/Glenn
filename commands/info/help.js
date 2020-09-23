module.exports.run = async function () {
    return this.reply('**Glenn can help with the following**: \n <> = optional, [] = required \n\n `!join` - Signs yourself up as a candidate in the active election. \n\n `!vote [@user]` - Allows you to vote for a candidate in an active election \n\n `!candidates` - Lists all candidates you can vote for in an election \n\n `!avatar <@user>` - Shows a user avatar \n\n `!members` - Displays user count \n\n `!ping` - Displays latency to server');
}
