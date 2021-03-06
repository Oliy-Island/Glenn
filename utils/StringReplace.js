module.exports = function (client, str, obj = {}) {
  const match = str.match(/{{ [\w.-]+ }}/g)
  if (!match) return str

  match.forEach(part => {
    let bit = part.match(/{{ ([\w+.-]+) }}/)
    if (!bit) return
    bit = bit[1]

    if (obj[bit]) {
      str = str.replace(new RegExp(`{{ ${bit} }}`, 'gi'), obj[bit])
      return
    }

    const [piece, prop] = bit.split('.')
    if (!prop) return

    let replace = null

    let channel

    switch (piece) {
      case 'channels':
        channel = client.channel(prop)
        if (!channel) return
        replace = `${channel}`
        break
    }

    if (!replace) return

    str = str.replace(new RegExp(`{{ ${bit} }}`, 'gi'), replace)
  })
  return str
}
