const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class UserCommand extends Command {
    constructor() {
        super('user', {
           aliases: ['user'],
           args: [
                {
                    id: 'id',
                    match: 'content'
                }
           ]
        });
    }

    async exec(message,args) {
        let member = message.mentions.members.first() || (args.id?await message.guild.members.fetch(args.id):message.member);
        let { user } = member
        let embed = new MessageEmbed()
        .setAuthor(`${user.id}`)
        .setTitle(`${user.tag}`)
        .setThumbnail(user.displayAvatarURL())
        .addField("Nickname", member.nickname || "none", true)
        .addField("Activity", user.presence.activities[0]?.details,true)
        .addField("Highest role", member.roles.highest.name)
        .addField("Account created:", `${user.createdAt.toLocaleDateString('en-GB')},\n${user.createdAt.toLocaleTimeString('en-GB')}`, true)
        .addField("Joined at:", `${member.joinedAt.toLocaleDateString('en-GB')},\n${member.joinedAt.toLocaleTimeString('en-GB')}`, true)
        
        message.reply(embed)

    }
}

module.exports = UserCommand;