exports.run = async function () {
  await this.send(':ok_hand:')

  process.exit(2)
}

exports.info = {
  level: 'developer'
}
