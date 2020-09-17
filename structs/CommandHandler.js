const { Collection } = require('discord.js')

const { readdirSync } = require('fs')
const Path = require('path')

const CommandContext = require('./CommandContext')

class CommandHandler {
    constructor (client) {
        this.client = client

        this.commands = new Collection()
    }

    load () {
        const commands = readdirSync(Path.resolve(__dirname, '../commands'))

        commands.forEach(command => {
            const [name, ext] = command.split('.')
            if (ext !== 'js') return

            delete require.cache[require.resolve(`../commands/${command}`)]
            const cmd = require(`../commands/${command}`)

            if (!cmd.info) cmd.info = {}
            if (!cmd.info.aliases) cmd.info.aliases = []

            cmd.info.name = name

            this.commands.set(name, cmd)
        })
    }

    event (message) {
        const prefix = this.client.config.prefixes.find(x => message.content.startsWith(x))
        if (!prefix) return

        const args = message.content.slice(prefix.length).split(/\s/)
        const command = args.shift()

        const cmd = this.commands.find(x => [x.info.name, ...x.info.aliases].includes(command.toLowerCase()))

        message.args = args

        const context = new CommandContext(this.client, cmd, message)

        try {
            cmd.run.bind(context)(message)
        } catch (err) {
            console.error(err)

            context.error()
        }
    }
}

module.exports = CommandHandler;