class CommandContext {
    constructor(msg, client) {
        this.command = msg;
        this.messages = [this.command];

        this.client = client;
        
        this.awaitingResponses = {};

        return this;
    }

    async prepare() {
        this.prefix = process.env.BASE_PREFIX;

        this.isCommand = this.command.content.startsWith(this.prefix);

        if (!this.isCommand) return this;

        const args = this.command.content.substring(this.prefix.length).split(/[ ]+/);

        this.name = args.shift();
        this.args = args;
        
        return this;
    }

    async run() {
        await this.client.commands.run(this);
    }

    async reply(content) {
        const msg = await this.command.channel.createMessage(content);

        this.messages.push(msg);
    }

    awaitResponse(possibleResponses, listenTimeout = 60000) {
        return new Promise(resolve => {
            let responses = [];

            let gotResponse = reason => {
                delete this.client.commands.awaitingResponses[this.command.id];
                resolve(reason);
            }

            const timeout = setTimeout(() => {
                finish('TIMEOUT');
            }, listenTimeout)
            
            this.client.commands.awaitingResponses[this.command.id] = (msg) => {
                if (responses.includes(msg.content) && this.command.author.id === msg.author.id && this.command.channel.id === msg.channel.id) {
                    clearTimeout(timeout);
                    this.messages.push(msg);

                    gotResponse(msg.content);
                    return true;
                }
            }
        });
    }

    async finish(err, display) {
        if (err) {
            await this.reply(display ? err : 'There was an error executing your command.');
            console.error(`Error executing command:\n`, err);
        }
    }
}

module.exports = CommandContext;