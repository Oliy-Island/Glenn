const mongoose = require('mongoose')
const config = require('../config')
const { promises: fs } = require('fs')
const path = require('path')

const env = process.env.NODE_ENV || 'prod'
const host = config.dbHost || 'localhost'
const url = `mongodb://${host}:${config.dbPort}/island`

// Connect to mongo
if (env === 'dev') {
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: '',
    pass: ''
  })
} else {
  mongoose.connect(url, { user: '', pass: '' })
}

// Collect models
const models = {}

fs.readdir(path.join(__dirname, '../models'))
  .then(files => {
    for (const file of files) {
      const key = file.split('.')[0]
      models[key] = require(`../models/${key}`)
    }
  })

module.exports = models
