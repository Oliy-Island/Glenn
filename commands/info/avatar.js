module.exports.run = async function (message) {
    
    const user = message.mentions.users.first() || message.author;
    
    this.send(this.client.embed
        .setImage(user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')    
    )
}
