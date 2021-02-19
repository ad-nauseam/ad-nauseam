const { Command } = require("discord-akairo");

class GiveCommand extends Command {
    constructor() {
        super('give', {
            aliases: ['give'],
            args: [{
                id: 'amount',
                type: 'number',
                match: 'phrase',
                unordered: true
            }]
        })
    }
    async exec(message, args) {
        const member = message.mentions.members.first() ?? message.member
        if(!message.member.roles.cache.has('806555833437388802')) return
        console.log(args.amount)
        member.addBalance(args.amount)
            .then(async() => message.channel.send(`You gave **${member.user.username}** ${args.amount}₩`))
            .catch(async() => message.channel.send(`Invalid Arguments`))
    }
}

module.exports = GiveCommand;
