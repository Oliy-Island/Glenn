module.exports.run = async function () {
  await this.send(':ok_hand:')

  process.exit(2)
}

module.exports.info = {
  level: 'developer'
}
