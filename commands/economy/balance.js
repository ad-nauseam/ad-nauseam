const { Command } = require('discord-akairo');

class BalanceCommand extends Command {
    constructor(){
        super('balance', {
            aliases: ['balance', 'bal'],
            args: [
                {
                    id: 'user',
                    match: 'text'
                }
           ]
        })
    }
    async exec(message, args) {
        const member = message.mentions.members.first() ?? message.member
        message.channel.send(`**${member.user.username}** has ${await member.balance()}₩`);
    }
}

module.exports = BalanceCommand;
