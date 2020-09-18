module.exports.run = async function (message) {
    this.send(this.client.embed
        .setImage(message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')    
    )
}
