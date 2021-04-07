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
        let member = message.mentions.members.first() || await message.guild.members.fetch(args.id);

        let embed = new MessageEmbed()
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        .setTitle(`${member.user.tag} (${member.user.id})`)
        .setThumbnail(member.user.displayAvatarURL())
        .addField("Highest role", member.roles.highest.name)
    }
}

module.exports = UserCommand;