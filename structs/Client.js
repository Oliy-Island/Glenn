const Discord = require('discord.js')

const config = require('../config')

const CommandHandler = require('./CommandHandler')
const EventHandler = require('./EventHandler')

const StringReplace = require('../utils/StringReplace')

const db = require('../utils/db')

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

		/**
 		 * Database
 		 * @type {DatabaseConnection}
		 */
		this.db = db;
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
		return StringReplace(this, string, obj)
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

	/**
	 * Get channel from config
	 * @param {String} id Channel Name
	 */
	channel (id) {
		id = this.config.channels[id]
		if (!id) return null

		return this.channels.cache.get(id)
	}

	/**
	 * Get role from config
	 * @param {String} id Role Name
	 */
	role (id) {
		id = this.config.roles[id]
		if (!id) return null

		return this.guild.roles.cache.get(id)
	}
}

module.exports = Client
