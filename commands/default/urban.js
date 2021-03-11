const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

class UrbanCommand extends Command {
    constructor() {
        super('urban', {
           aliases: ['urban'],
           args: [
                {
                    id: 'con',
                    match: 'content'
                }
           ]
        });
    }

    async execute(message, args) {
        const term = args.con.join(' ');
		const res = await fetch(`http://api.urbandictionary.com/v0/define?term=${term}`);
        const data = (await res.json()).list[0];

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**${data.word}:**\n${data.definition.replace(/\[+|\]+/g, '')}\n\n**Example:**\n${data.example.replace(/\[+|\]+/g, '')}`)
        .setFooter(`⬆️${data.thumbs_up} ⬇️${data.thumbs_down}`)

        return message.channel.send(embed);
	}
}

module.exports = UrbanCommand;