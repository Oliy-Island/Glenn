exports.run = async function (message) {
  const activeElection = await this.client.db.Election.checkActive()
  if (!activeElection) return this.error('There is currently no active election to join')
  const candidates = activeElection.candidates
  const checkUserId = candidates.find(userId => userId === message.author.id)
  if (checkUserId) return this.error('You have already joined this election')
  candidates.push(message.author.id)
  this.client.db.Election.updateCandidates(activeElection.id, activeElection.candidates)
  this.reply('You have successfully joined this election!')
}

exports.info = {
  authority: 1
}
