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
                }
           ]
        });
    }

    async exec(message,args) {
        let toBan = message.mentions.members.first() || args.id;
        let clientMember = message.guild.members.cache.get(message.client.user.id);
        
        if (message.member.roles.highest.position <= clientMember.roles.highest.position) return;

        message.guild.members.ban(toBan, {reason : args.reason })
        .then(banned => { 
            message.channel.send(`Banned ${banned.user.tag}`)
            /*
            Logging + DB Stuff here
            */
    
        })
        .catch(err => message.channel.send('Cannot ban this user'));
        
    }
}

module.exports = BanCommand;