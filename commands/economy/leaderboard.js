const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class LeaderboardCommand extends Command {
    constructor() {
        super('leaderboard', {
            aliases: ['leaderboard', 'lb'],
            args: [{
                id: 'page',
                type: 'integer'
            }]
        })
    }
    async exec(message, args) {
        console.log(args);
        message.guild.members.fetch();
        message.client.sql`select * from users`.then(async query => {
            if(query.count < 11){
                const embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setColor()
                .setDescription(query.filter(m => message.guild.members.cache.get(m.id)).map(q => `**${message.guild.members.cache.get(q.id).user.tag}** - ${q.balance}`))
                .setFooter('Page 1/1')
                message.channel.send(embed);
            }else{
                const embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setColor()
                .setDescription(query.filter(m => message.guild.members.cache.get(m.id)).map(q => `**${message.guild.members.cache.get(q.id).user.tag}** - ${q.balance}`))
                .setFooter('Page 1/1')
                message.channel.send(embed).then(async m => m.react('◀️').then(m.react('▶️')))
            }
        })
    }
}

module.exports = LeaderboardCommand;
