module.exports.run = function (message) {
  this.reply(`Authority: ${message.member.authority}`)
}