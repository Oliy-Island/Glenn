const moment = require('moment')

exports.run = async function (message) {
  const parseTime = (time) => {
    if (time === 'now') return moment()
    return moment(time)
  }

  const startDate = parseTime(message.args[0])
  const endDate = parseTime(message.args[1])
  const winners = parseInt(message.args[2])

  const checkActive = await this.client.db.Election.checkActive(endDate)
  if (checkActive) return this.error('There is already an active election')
  const election = {
    startDate,
    endDate,
    winners
  }

  const createElection = await this.client.db.Election.create(election)
  return this.reply(`Successfully created election with ${createElection.winners} winners \n\n Election ID: ${createElection.id}`)
}

exports.info = {
  level: 'owner'
}
