const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'],
           args: [
                {
                    id: 'con',
                    match: 'content'
                }
           ]
        });
    }

    exec(message,args) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;