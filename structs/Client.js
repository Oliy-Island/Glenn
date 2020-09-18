const Discord = require('discord.js')

const config = require('../config')

const CommandHandler = require('./CommandHandler')
const EventHandler = require('./EventHandler')

const StringReplace = require('../utils/StringReplace')

/**
 * Client
 */
class Client extends Discord.Client {
	constructor () {
		super()
		/**
		 * Config
		 * @type {Object}
		 */
		this.config = config;

		/**
		 * Commands
		 * @type {CommandHandler}
		 */
		this.commands = new CommandHandler(this)
		/**
		 * Events
		 * @type {EventHandler}
		 */
		this.events = new EventHandler(this)

		/**
		 * Bound guild
		 * @type {?Guild}
		 */
		this.guild = null
	}

	/**
	 * Gets new embed
	 * @type {Embed}
	 */
	get embed () {
		return new Discord.MessageEmbed()
	}

	/**
	 * Replace a string {{ etc }}
	 * @param {String} string Replacing string
	 * @param {Object} obj Extra replacements
	 */
	replacer (string, obj) {
		return StringReplace(this.config, string, obj)
	}

	/**
	 * Starts bot
	 * @async
	 */
	async start () {
		this.commands.load()
		this.events.load()

		await this.login(process.env.DISCORD_TOKEN)

		this.config.prefixes.push(`<@${this.user.id}>`, `<@!${this.user.id}>`)
	}
}

module.exports = Client