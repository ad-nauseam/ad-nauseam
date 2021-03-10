const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
           aliases: ['kick'],
           args: [
                {
                    id: 'id',
                },
                {
                    id: 'reason',
                    match : 'rest'
                }
           ],
        });
    }

    async exec(message,args) {
        let toKick = message.mentions.members.first() || await message.guild.members.fetch(args.id).catch(() => null)
        if(!toKick) return message.reply('You need to provide a valid user to kick!')
        
        if(message.member.roles.highest.position <= message.guild.me.roles.highest.position) return

        toKick.kick(args.reason).then(member => {
            message.channel.send(`Successfully kicked **${toKick.user.tag}**`)
        })
        .catch(err => message.channel.send('Cannot kick this user'));
        
    }
}

module.exports = KickCommand;