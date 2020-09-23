const { Collection } = require('discord.js')

const votes = new Collection()

module.exports.run = function (message) {
  const member = message.mentions.members.first()
  if (!member) return this.reply('Format: `!resident @user`')

  if (member.authority >= 1) return this.error('This user is already a resident')
  if (member.authority < 0) return this.error('User must become a guest first')

  let vote = votes.get(member.id)
  if (!vote) {
    vote = {}
  }

  if (vote[message.author.id]) return this.error('You\'ve already voted for this user')

  vote[message.author.id] = message.member.authority

  const total = Object.values(vote).reduce((a, b) => a + b, 0)

  this.reply(`Voted for ${member} to become resident +${message.member.authority} (${total} / ${this.client.config.misc.requiredResidentVote})`)

  if (total < this.client.config.misc.requiredResidentVote) return votes.set(member.id, vote)

  votes.delete(member.id)

  member.roles.add(this.role('resident'))
  member.roles.remove(this.role('guest'))
}

module.exports.info = {
  authority: 1
}
