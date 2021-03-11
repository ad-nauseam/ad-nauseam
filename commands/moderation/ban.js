const { Command } = require('discord-akairo');
const utils = require("./../../utils.js")
class BanCommand extends Command {
    constructor() {
        super('ban', {
           aliases: ['ban', 'yeet'],
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
        let toBan = message.mentions.users.first() || await message.client.users.fetch(args.id).catch( () => {} );        
        
        if (!utils.isStaff(message.member)) return;

        message.guild.members.ban(toBan, {reason : args.reason, days : args.days })
        .then( () => { 
            message.reply(`Banned **${toBan.tag}**`);
            message.client.emit('guildBanAdd', message.guild, toBan, message.author);
                
        })
        .catch( () => message.reply('Cannot ban this user'));
        
    }
}

module.exports = BanCommand;