const { Structures } = require('discord.js')

module.exports = (client) => {
  Structures.extend('GuildMember', GuildMember => {
    class UpdatedGuildMember extends GuildMember {
      constructor (...d) {
        super(...d)
      }

      get authority () {
        let auth = -1

        Object.keys(client.config.authorities).forEach(role => {
          if (!this.roles.cache.has(role)) return
          if (auth > client.config.authorities[role]) return

          auth = client.config.authorities[role]
        })
        
        return auth
      }
    }

    return UpdatedGuildMember
  })
}