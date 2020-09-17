# Moana
Private bot for the Oliy Island Discord server.

## Command Framework

The framework loads commands from the ``./commands`` directory by requiring them as a module and looking for a ``.fn`` property.
This should be an asynchronous function that takes a single "Context" argument.
You can also specify aliases for commands by setting module.aliases to an array of strings.
#### Context
| Property | Description |
| - | - |
| command | Original message object from Eris |
| client | Also the Eris client object |
| name | Command name |
| args | Array of command arguments, seperated by whitespace |
| Method | Description |
| - | - |
| reply | Reply to the command - Returns Promise |
| awaitResponse | Very basic message listener. Takes an array of strings, waits for a corresponding message from the same author in the same channel and resolves with the message content. |
