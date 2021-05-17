const { Command } = require('discord-akairo');
const utils = require("./../../utils/utils.js")
class SoftBanCommand extends Command {
    constructor() {
        super('softban', {
           aliases: ['softban'],
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
        let toBan = message.mentions.users.first() || await message.client.users.fetch(args.id).catch( () => {} );        
        
        if (!utils.isStaff(message.member)) return;
        
        message.guild.members.ban(toBan, {reason : args.reason, days : args.days })
        .then( () => { 
            message.reply(`Banned **${toBan.tag}**`)
            /*
            Logging + DB Stuff here
            */
    
        })
        .catch( () => message.reply('Cannot ban this user'));
        
    }
}

module.exports = SoftBanCommand;