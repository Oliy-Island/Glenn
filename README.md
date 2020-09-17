# Glenn
Private bot for the Oliy Island Discord server.

## Command Framework

The framework loads commands from the ``./commands`` directory by requiring them as a module and looking for a ``.run`` property.
This a function ran in context with the commands `CommandContext` (You'll find how to use that below)
The function receives a single `message` argument which is a discordjs#Message
Do keep in mind, please use the context methods rather than methods off of the message argument

#### Context
| Property | Description |
| - | - |
| message | Message object + `.args` which is an array of arguments|
| client | Client |
| command | Command object |

| Method | Description |
| - | - |
| reply (text) | Reply to the command in an embed |
| error (text) | Reply to the command with an error embed |
| send (content) | Port of discordjs#TextChannel.send (Use .reply and .error when able) |