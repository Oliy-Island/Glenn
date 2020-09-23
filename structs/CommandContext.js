class CommandContext {
  constructor (client, command, message) {
    this.client = client
    this.command = command
    this.message = message
  }

  send (content) {
    return this.message.channel.send(content)
  }

  reply (text) {
    return this.send(this.client.embed
      .setColor('GREEN') // TODO
      .setFooter(this.message.author.tag, this.message.author.avatarURL())
      .setDescription(this.client.replacer(text, {
        user: `${this.message.author}`,
        channel: `${this.message.channel}`
      }))
      .setTimestamp()
    )
  }

  error (text) {
    return this.send(this.client.embed
      .setColor('RED')
      .setFooter(this.message.author.tag, this.message.author.avatarURL())
      .setDescription(`${text ? `Error Occured: ${text}` : 'An Error Occured While Running This Command'}`)
      .setTimestamp()
    )
  }

  get channel () {
    return this.client.channel
  }

  get role () {
    return this.client.role
  }
}

module.exports = CommandContext
