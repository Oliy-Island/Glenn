const RoleUpdate = require('../utils/RoleUpdate')

module.exports = function (oldMember, newMember) {
  const updated = RoleUpdate(oldMember, newMember)

  const addedRole = updated.added.find(x => this.config.welcoming[x.id])
  if (!addedRole) return

  const welcoming = this.config.welcoming[addedRole.id]

  this.channels.cache.get(welcoming[0])
    .send(this.replacer(welcoming[1], { user: `${newMember}` }))
}
