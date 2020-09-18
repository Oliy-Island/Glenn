module.exports = function () {
    console.log(`Bot ready as ${this.user.tag}`)

    this.guild = this.guilds.cache.get(this.config.guild)
    if (this.guild) this.guild.members.fetch().then(x => console.log(`Loaded ${x.size} members`))

    this.user.setActivity('the island...', { type: 'WATCHING' })
}