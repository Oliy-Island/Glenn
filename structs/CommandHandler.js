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
        this.commands.clear()

        const commands = readdirSync(Path.resolve(__dirname, '../commands'))

        commands.forEach(command => {
            const [name, ext] = command.split('.')
            if (ext !== 'js') return

            delete require.cache[require.resolve(`../commands/${command}`)]
            const cmd = require(`../commands/${command}`)

            if (!cmd.info) cmd.info = {}
            if (!cmd.info.aliases) cmd.info.aliases = []
            if (!cmd.info.level) cmd.info.level = false

            cmd.info.name = name

            this.commands.set(name, cmd)
        })
    }

    event (message) {
        const prefix = this.client.config.prefixes.find(x => message.content.startsWith(x))
        if (!prefix) return

        const args = message.content.slice(prefix.length).split(/\s/).filter(x => x)
        const command = args.shift()

        const cmd = this.commands.find(x => [x.info.name, ...x.info.aliases].includes(command.toLowerCase()))
        if (!cmd) return

        message.args = args

        const context = new CommandContext(this.client, cmd, message)
        
        if (!this.checkLevel(message.author.id, cmd.info.level)) return context.error('You\'re not allowed to run this command.')

        try {
            cmd.run.bind(context)(message)
        } catch (err) {
            console.error(err)

            context.error()
        }
    }

    /**
     * Check if user has command permission level
     * @param {Snowflake} user User
     * @param {String} level Level
     */
    checkLevel (user, level) {
        let allowed = false
        switch (level) {
            case 'owner':
                allowed = this.client.config.owner === user
                break
            case 'developer':
                allowed = this.client.config.owner === user ||
                       this.client.config.developers.includes(user)
                break
            default:
                allowed = true
                break
        }
        return allowed
    }
}

module.exports = CommandHandler;
