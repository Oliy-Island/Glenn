const { Collection } = require('discord.js')

const { readdirSync, statSync } = require('fs')
const Path = require('path')

const CommandContext = require('./CommandContext')

class CommandHandler {
  constructor (client) {
    this.client = client

    this.commands = new Collection()
  }

  _loadFolder (folder) {
    const commands = readdirSync(folder)

    commands.forEach(command => {
      const place = Path.resolve(folder, command)
      if (statSync(place).isDirectory()) return this._loadFolder(place)
      const [name, ext] = command.split('.')
      if (ext !== 'js') return

      delete require.cache[require.resolve(place)]
      const cmd = require(place)

      if (!cmd.info) cmd.info = {}
      if (!cmd.info.aliases) cmd.info.aliases = []
      if (!cmd.info.level) cmd.info.level = false
      if (!cmd.info.authority) cmd.info.authority = -1

      cmd.info.name = name

      this.commands.set(name, cmd)
    })
  }

  load () {
    this.commands.clear()

    this._loadFolder(Path.resolve(__dirname, '../commands'))
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
    if (message.member.authority < cmd.info.authority) return context.error('You don\'t have enough authority!')

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

module.exports = CommandHandler
