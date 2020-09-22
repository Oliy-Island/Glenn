const moment = require('moment')

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

module.exports.run = async function (message) {
  const getElection = await this.client.db.Election.getElection(message.args[0])
  if (!getElection) return this.error('No election with that ID found');

  // if (getElection.endDate > moment()) return this.error('Cannot display election results until the end date has passed')

  const results = getElection.candidates.map(candidate => {
    const candidateVotes = getElection.votes.filter(vote => {
      return vote.candidateChoice === candidate;
    })
    return {
      id: candidate,
      votes: candidateVotes.length
    }
  })

  const sortedResults = sortByKey(results, 'votes')

  let resultsMessage = `**Election Results**\n\n`;

  sortedResults.forEach((result, i) => {
    const lol = resultsMessage.concat(`<@${result.id}> - ${result.votes} votes\n`)
    resultsMessage = lol
  });


  this.reply(resultsMessage)
}

module.exports.info = {
  level: 'owner'
}
