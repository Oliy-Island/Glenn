exports.run = async function (message) {
  const user = message.mentions.users.first() || this.client.users.cache.find(u => u.username.toLowerCase().startsWith(message.args.slice(0).join(" ").toLowerCase())) || message.author

  this.send(this.client.embed
    .setImage(user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
    .setColor('RANDOM')
  )
}
