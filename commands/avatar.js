module.exports.run = async function () {
    this.send(this.client.embed
        .setImage(message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')    
    )
}
