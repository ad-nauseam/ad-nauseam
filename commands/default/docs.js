const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

class DocsCommand extends Command {
    constructor() {
        super('docs', {
           aliases: ['docs'],
           args: [
                {
                    id: 'con',
                    match: 'text'
                }
           ]
        });
    }

    async exec(message,args) {
        let base = 'http://api.synyster.org/api'

        const search = args.con || 'types'
        
        let uri = search.includes('#')
            ? `${base}/${search.split('#')[0]}?q=${search.split('#')[1]}`
            : `${base}/${search}`

        let  res = await fetch(uri).then(res=>res.json())
        if(res.error) return message.channel.send(res.error)
        const { data, type, q } = res

        const embed = new MessageEmbed()
            .setDescription(`\`\`\`${require('util').inspect(data)}\`\`\``)
            .setTitle(`${type} ${ q ? `- ${q}` : ''}`)

        message.channel.send(embed)
    }
}

module.exports = DocsCommand;