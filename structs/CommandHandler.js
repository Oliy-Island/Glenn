const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

class CommandHandler extends EventEmitter {
    constructor() {
        super();

        this.commands = {};
        this.loaded = false;

        this.awaitingResponses = {};
    }

    async run(context) {
        await this.commands[context.name].run(context);
    }

    exists(context) {
        return this.commands[context.name] != null;
    }

    load(directory) {
        return new Promise((resolve, reject) => {
            this.directory = directory;

            fs.readdir(this.directory, (err, files) => {
                if (err) reject(err);

                for (let file of files) {
                    const name = file.substring(0, file.length - 3)
                    if (this.commands[name] != null) reject(`Duplicate command name: ${name}`);

                    let command = require(`${this.directory}/${file}`);

                    this.commands[name] = { run: command.fn, filename: file };
                    if (process.env.DEBUG === '1') console.log(`Command Handler: Registered command ${process.env.BASE_PREFIX}${name}`);

                    if (command.aliases) for (let alias of command.aliases) {
                        this.commands[alias] = { isAlias: true, run: command.fn, filename: file };
                        if (process.env.DEBUG === '1') console.log(`Command Handler: Registered alias ${process.env.BASE_PREFIX}${alias}`);
                    }
                }
                
                this.loaded = true;
                this.emit('ready');

                resolve()
            })
        });
    }

    unload() {
        this.loaded = false;

        for (let command of Object.keys(this.commands)) {
            if (!command.isAlias) delete require.cache[require.resolve(`${this.directory}/${this.commands[command].filename}`)]
            if (process.env.DEBUG === '1') console.log(`Command Handler: Unregistered command ${process.env.BASE_PREFIX}${command}`);
        }
        
        this.commands = []
    }

    async reload() {
        this.unload();
        await this.load(this.directory);
    }
}

module.exports = CommandHandler;