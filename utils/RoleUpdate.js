module.exports = (oldMember, newMember) => ({
  removed: oldMember.roles.cache
    .filter(x => !newMember.roles.cache.has(x.id)),
  added: newMember.roles.cache
    .filter(x => !oldMember.roles.cache.has(x.id))
})
