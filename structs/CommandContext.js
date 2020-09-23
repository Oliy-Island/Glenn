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
      .setAuthor(msg.author.tag, msg.author.avatarURL())
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
      .setAuthor(msg.author.tag, msg.author.avatarURL())
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
