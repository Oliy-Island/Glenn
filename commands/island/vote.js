exports.run = async function (message) {
  const activeElection = await this.client.db.Election.checkActive()
  if (!activeElection) return this.error('There is currently no active election to vote in')

  const member = message.mentions.members.first()
  if (!member) return this.reply('Format: `!vote @user` \n\n **Tip**: do `!candidates` to see who you can vote for.')
  if (member.id === message.author.id) return this.error('You cannot vote for yourself...')

  const checkIfCandidate = activeElection.candidates.find(candidate => candidate === member.id)
  if (!checkIfCandidate) return this.error('The person you voted for is not a candidate in this election \n\n Encourage them to do `!join`')

  const votes = activeElection.votes

  const vote = {
    voterId: message.author.id,
    candidateChoice: member.id,
    amended: false
  }

  const votedCheck = votes.find(vote => vote.voterId === message.author.id)

  if (votedCheck) {
    if (votedCheck.amended) return this.error('You can no longer change your vote.')
    const newVotes = votes.filter(vote => vote.voterId !== message.author.id)
    vote.amended = true
    newVotes.push(vote)
    this.client.db.Election.updateVotes(activeElection.id, newVotes)
  } else {
    votes.push(vote)
    this.client.db.Election.updateVotes(activeElection.id, votes)
  }
  this.reply('Thank you for voting! \n\n **Tip:** If you change your mind you can change your vote once per election by voting for someone else.')
}

exports.info = {
  authority: 1
}
