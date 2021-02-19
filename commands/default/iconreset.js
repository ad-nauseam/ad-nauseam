const { Command } = require('discord-akairo');
const fetch = require('node-fetch')
class IconReset extends Command {
    constructor() {
        super('iconreset', {
           aliases: ['iconreset', 'reseticon'],
           args: [
            {
                id: 'url',
                type: 'string',
                default: "https://media.discordapp.net/attachments/806694793152299038/808760957207052298/DiligentHarmoniousAfricanhornbill-mobile.jpg"
            }
        ],
           userPermissions: ['MANAGE_GUILD']
        });
    }

    async exec(message,args) {
        const iconUrl = "https://media.discordapp.net/attachments/806694793152299038/808760957207052298/DiligentHarmoniousAfricanhornbill-mobile.jpg";
        if (!/^(https?:\/\/)/g.exec(args.url)) args.url = iconUrl;
        const getRes = async (url) => {
            try {
              const response = await fetch(url);
              const arrayBuffer = await response.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              return buffer;
            } catch (error) {
              return { error };
            }
        };
        
          let icon = await getRes(args.url);
          message.guild.setIcon(icon)
          .then(updated => {
                if(!message.guild.icon){
                  getRes(iconUrl).then(a => message.guild.setIcon(a));
              }
                else {
                    return message.reply('Updated the guild icon');
            }
        })
          .catch(getRes(iconUrl).then(a => message.guild.setIcon(a)) && message.reply('Updated the guild icon'));
    }
}

module.exports = IconReset;