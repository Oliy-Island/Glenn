const RoleUpdate = require('../utils/RoleUpdate')

module.exports = function (oldMember, newMember) {
  const updated = RoleUpdate(oldMember, newMember)

  const welcomedRole = updated.added.find(x => this.config.welcoming[x.id])
  if (welcomedRole) {
    const welcoming = this.config.welcoming[welcomedRole.id]

    this.channels.cache.get(welcoming[0])
      .send(this.replacer(welcoming[1], { user: `${newMember}` }))
  }

  const updateRole = updated.added.find(x => this.config.roleUpdates[x.id])
  if (updateRole) {
    newMember.roles.remove(this.config.roleUpdates[updateRole.id])
  }
}
