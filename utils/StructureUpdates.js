const { Structures } = require('discord.js')

module.exports = (client) => {
  Structures.extend('GuildMember', GuildMember => {
    class UpdatedGuildMember extends GuildMember {
      constructor (...d) {
        super(...d)
      }

      get authority () {
        if (this.roles.cache.has(client.config.roles.citizen)) return 2
        if (this.roles.cache.has(client.config.roles.resident)) return 1

        return 0
      }
    }

    return UpdatedGuildMember
  })
}