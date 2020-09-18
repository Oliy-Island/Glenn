module.exports = function () {
    console.log(`Bot ready as ${this.user.tag}`)

    this.guild = this.guilds.cache.get(this.config.guild)
    this.guild.members.fetch().then(x => console.log(`Loaded ${x.size} members`))
}