const { readdirSync } = require('fs')
const Path = require('path')

class EventHandler {
  constructor (client) {
    this.client = client

    this.loaded = {}
  }

  load () {
    const events = readdirSync(Path.resolve(__dirname, '../events'))

    events.forEach(event => {
      const [name, ext] = event.split('.')
      if (ext !== 'js') return

      const eventRun = require(`../events/${event}`).bind(this.client)

      if (this.loaded[name]) {
        this.client.off(name, this.loaded[name])
      }

      this.loaded[name] = eventRun
      this.client.on(name, eventRun)
    })
  }
}

module.exports = EventHandler
