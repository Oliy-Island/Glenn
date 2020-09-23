function clean (text) {
  if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
}

exports.run = async function (message) {
  const client = this.client // eslint-disable-line no-unused-vars

  try {
    const code = message.args.join(' ')

    let evaled = eval(code) // eslint-disable-line no-eval
    if (evaled && evaled.then) evaled = await evaled

    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)

    this.reply(`\`\`\`js\n${clean(evaled)}\`\`\``)
  } catch (err) {
    this.error(`\n\`\`\`xl\n${clean(err)}\`\`\``)
  }
}

exports.info = {
  level: 'owner'
}
