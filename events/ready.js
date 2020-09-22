module.exports = async function () {
    console.log(`Bot ready as ${this.user.tag}`)

    this.guild = this.guilds.cache.get(this.config.guild)
    if (this.guild) await this.guild.members.fetch().then(x => console.log(`Loaded ${x.size} members`))

    this.user.setActivity('the ice cubes melt in my water.', { type: 'WATCHING' })

    // account for downtime

    await Promise.all(this.guild.members.cache
        .filter(x => x.authority < 0 && !x.roles.cache.has(this.role('unverified').id)) // if member does not have roles and doesn't already have unverified
        .map(x => x.roles.add(this.role('unverified'))))
        .then(x => console.log(`Added ${x.length} to unverified`))
}
