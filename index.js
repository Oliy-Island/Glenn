require('dotenv').config();

const Eris = require("eris");

const CommandContext = require('./structs/CommandContext');
const CommandHandler = require('./structs/CommandHandler');

const client = new Eris(process.env.DISCORD_TOKEN)

client.commands = new CommandHandler();

client.on('error', err => {
    if (process.env.DEBUG === '1') console.log('Eris Client Error:', err);
});

client.on('connect', () => {
    if (process.env.DEBUG === '1') console.log('Connected to Discord.');
});

client.on('ready', () => {
    if (process.env.DEBUG === '1') console.log('Bot is ready.');
});

client.on('messageCreate', async msg => {
    for (let check of Object.keys(client.commands.awaitingResponses)) {
        if (client.commands.awaitingResponses[check](msg)) return;
    }

    const context = await new CommandContext(msg, client).prepare();

    if (!context.isCommand) return;

    try {
        if (!client.commands.exists(context)) return await context.finish('This command doesn\'t seem to exist.', true);

        await context.run();
        await context.finish();
    } catch (err) {
        await context.finish(err)
    }
});

async function start() {
    await client.commands.load(`${require('path').dirname(require.main.filename)}/commands`);
    
    client.connect();
}

if (process.env.debug === '1') Logger.setLevel('debug')

start();