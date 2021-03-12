const { Command } = require('discord-akairo');

class UnbanCommand extends Command {
    constructor() {
        super('unban', {
           aliases: ['unban'],
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
        let to = message.mentions.users.first() || await message.client.users.fetch(args.id).catch(() => null);
        if(!to) return message.reply('You need to provide a valid user to unban!');
        
        if(message.member.roles.highest.position <= message.guild.me.roles.highest.position) return;

        message.guild.members.unban(to, args.reason).then(() => {
            message.channel.send(`Successfully unbanned **${to.tag}**`);
            message.client.emit('guildBanRemove', message.guild, to, message.author);

        })
        .catch(err => message.channel.send('This user is not banned!'));
        
    }
}

module.exports = UnbanCommand;