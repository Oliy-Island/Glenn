class CommandContext {
    constructor(client, command, message) {
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
            .setTitle(`${text ? `Error Occured: ${text}` : 'An Error Occured While Running This Command'}`)
            .setTimestamp()
        )
    }
}

module.exports = CommandContext;