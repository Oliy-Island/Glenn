module.exports = function (member) {
  member.roles.add(this.role('unverified'))
}
