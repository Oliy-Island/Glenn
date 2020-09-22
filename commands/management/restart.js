module.exports.run = async function () {
  await this.send('Now restarting bot. :ok_hand:')

  process.exit(2)
}

module.exports.info = {
  level: 'developer'
}
