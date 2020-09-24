const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const ElectionSchema = mongoose.Schema({
  id: String,
  candidates: Array,
  votes: Array,
  startDate: Date,
  endDate: Date,
  winners: Number
})

const ElectionModel = mongoose.model('Election', ElectionSchema)

const create = async (election) => {
  const newElection = new ElectionModel()

  const id = uuidv4()

  newElection.id = id
  newElection.startDate = election.startDate
  newElection.endDate = election.endDate
  newElection.winners = election.winners

  try {
    const saveElection = await newElection.save()
    return saveElection
  } catch (e) {
    return {
      error: e.errmsg
    }
  }
}

const checkActive = async () => {
  const today = moment()
  const active = await ElectionModel.findOne({ endDate: { $gte: today } })
  return active
}

const updateCandidates = async (electionId, candidates) => {
  return ElectionModel.updateOne({ id: electionId }, { $set: { candidates } })
}

const updateVotes = async (electionId, votes) => {
  return ElectionModel.updateOne({ id: electionId }, { $set: { votes } })
}

const getElection = async (electionId) => {
  const get = await ElectionModel.findOne({ id: electionId })
  return get
}

const Election = {
  create,
  checkActive,
  updateCandidates,
  updateVotes,
  getElection
}

module.exports = Election
