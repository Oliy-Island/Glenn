const Discord = require('discord.js')

const config = require('../config')

const CommandHandler = require('./CommandHandler')
const EventHandler = require('./EventHandler')

class Client extends Discord.Client {
	constructor () {
		super()
		this.config = config;

		this.commands = new CommandHandler(this)
		this.events = new EventHandler(this)
	}

	get embed () {
		return new Discord.MessageEmbed()
	}

	async start () {
		this.commands.load()
		this.events.load()

		await this.login(process.env.DISCORD_TOKEN)

		this.config.prefixes.push(`<@${this.user.id}>`, `<@!${this.user.id}>`)
	}
}

module.exports = Client