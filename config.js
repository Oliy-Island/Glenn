const fs = require('fs')

const config = {
  prefixes: ['!'],
  owner: '129908908096487424',
  developers: [],
  guild: '419422246168166400',
  roles: {
    unverified: '757359333183979621',
    guest: '755412205041877033',
    resident: '755412894794907728',
    citizen: '755416646579126316'
  },
  channels: {
    'bulletin-board': '755413533201530911',
    'northern-beach': '731661166606155847',
    'resident-lounge': '755425365362737214',
    'citizen-oval': '755425533847928906'
  },
  welcoming: {
    guest: [
      'northern-beach',
      'Welcome to the island {{ user }}:sparkles:\n\nMake sure to check out {{ channels.bulletin-board }}:pushpin:'
    ],
    resident: [
      'resident-lounge',
      'Congratulations {{ user }}, for becoming the island\'s newest resident!:tada:'
    ],
    citizen: [
      'citizen-oval',
      'Congratulations {{ user }}, for becoming the island\'s newest citizen!:tada:'
    ]
  },
  authorities: { // Sets GuildMember#authority (none = -1)
    guest: 0,
    resident: 1,
    citizen: 2
  },
  misc: {
    requiredResidentVote: 3 // total of authority ex; (2x citizen or 3x resident or 1 citizen & 2 residents, etc.)
  }
}

if (fs.existsSync('./overrides.js')) {
  const overrides = require('./overrides')

  function runObject (current, changes) {
    Object.keys(changes).forEach(key => {
      if (typeof changes[key] === 'object') {
        if (!current[key]) current[key] = {}
        return runObject(current[key], changes[key])
      }

      current[key] = changes[key]
    })
  }

  runObject(config, overrides)
}

// config setup

Object.keys(config.welcoming).forEach(role => {
  config.welcoming[config.roles[role]] = [
    config.channels[config.welcoming[role][0]],
    config.welcoming[role][1]
  ]

  delete config.welcoming[role]
})

Object.keys(config.authorities).forEach(role => {
  config.authorities[config.roles[role]] = config.authorities[role]

  delete config.authorities[role]
})

module.exports = config
