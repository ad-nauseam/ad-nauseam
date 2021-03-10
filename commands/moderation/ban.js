const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
           aliases: ['ban'],
           args: [
                {
                    id: 'id',
                },
                {
                    id: 'reason',
                    match : 'rest'
                },
                {
                    id: 'days',
                    match: 'option',
                    flag: '--d',
                    type: 'integer',
                    default: 0
                }
           ]
        });
    }

    async exec(message,args) {
        let toBan = message.mentions.users.first() || await message.client.users.fetch(args.id).catch( err => {} );
        let clientMember = message.guild.me;
        
        if (message.member.roles.highest.position <= clientMember.roles.highest.position) return;

        message.guild.members.ban(toBan, {reason : args.reason, days : args.days })
        .then(banned => { 
            message.channel.send(`Banned **${toBan.tag}**`)
            /*
            Logging + DB Stuff here
            */
    
        })
        .catch(err => message.channel.send('Cannot ban this user'));
        
    }
}

module.exports = BanCommand;