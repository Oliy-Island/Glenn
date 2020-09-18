module.exports.run = async function () {

let avatarEmbed = new Discord.MessageEmbed()
.setImage(message.author.displayAvatarURL({dynamic: true}))
.setColor('RANDOM')
    
    return this.send(avatarEmbed);
}
