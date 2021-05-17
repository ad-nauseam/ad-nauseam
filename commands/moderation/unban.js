const { Command } = require('discord-akairo');
const { dice } = require('./../../utils/dice.js')
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
        if(!to){
            let list = await message.guild.fetchBans()
            if (!list.size) return message.reply("there are no banned members")
            list = list.map(x => [x.user, dice(args.id, x.user.tag)]).sort((a,b) => b[1] - a[1])
            if ( list[0][1] > 0.6 ) to = list[0][0]
            else{
                return message.reply(`no close matches, are you looking for\`\`\`\n${list.slice(0,6).map(x => x[0].tag).join("\n")}\`\`\``)
            }
        }

        if(message.member.roles.highest.position <= message.guild.me.roles.highest.position) return;

        message.guild.members.unban(to, args.reason).then(() => {
            message.channel.send(`Successfully unbanned **${to.tag}**`);
            message.client.emit('guildBanRemove', message.guild, to, message.author);

        })
        .catch(err => message.channel.send('This user is not banned!'));
        
    }
}

module.exports = UnbanCommand;