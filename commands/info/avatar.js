exports.run = async function (message) {
  let user;
    if (!message.args[0]) { 
      user = message.author 
    } else if (args[0]) {
      user = message.mentions.users.first() || this.client.users.cache.find(u => u.username.toLowerCase().startsWith(message.args.slice(0).join(" ").toLowerCase())) || this.client.users.cache.get(args[0]) 
    } 

  this.send(this.client.embed
    .setImage(user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
    .setColor('RANDOM')
  )
}
