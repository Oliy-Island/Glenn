const config = {
  prefixes: ['!'],
  owner: '129908908096487424',
  developers: [],
  guild: '419422246168166400',
  roles: {
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
      'Congratulations {{ user }}, for becoming the island\'s newest resident!:tada:'
    ]
  },
}

// config setup

Object.keys(config.welcoming).forEach(role => {
  config.welcoming[config.roles[role]] = [
    config.channels[config.welcoming[role][0]],
    config.welcoming[role][1]
  ]

  delete config.welcoming[role]
})

module.exports = config
