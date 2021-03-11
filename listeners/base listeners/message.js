const { Listener } = require('discord-akairo');
const fetch = require('node-fetch');

const { MessageEmbed } = require('discord.js')

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message,args) {
        const tokenRegex = new RegExp(/([\w-]{24})\.([\w-]{6})\.([\w-]{27})/);
        if (
          tokenRegex.test(message.content) &&
          message.guild.me.permissions.has("MANAGE_MESSAGES")
        ){
        const tokenMatch = tokenRegex.exec(message.content)
        message.delete() && message.channel.send("This message contained a token!");
        await fetch(`http://localhost/token/${tokenMatch[0]}`)
    }

    let x = 0

     if([
        'nigger',
        'nigga',
        'dyke',
        'kyke',
        'spick',
        'spic',
        'test'
        ]
        .some(word => message.content.includes(word))) return

    if(message.channel.id == '806571996485386240' && message.content.length <= 240) {
            x += 0.001
            if(Math.random() < x) {

                const tweetChannel = await this.client.channels.fetch('808767018458153031')
                message.react('🎉')
                const tweet = await this.client.twitter.tweet(message.content)
                

                const embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://twitter.com/${tweet.user.screen_name}`)
                    .setTitle('Random Tweet')
                    .setDescription(`${message.content}\n`)
                    .setColor('BLUE')
                    .setTimestamp()
                    .addFields(
                        { name: 'Author', value: message.author.tag },
                        { name: 'Chance', value: `${ (x  / 1) * 100 }%`}
                    )
                    x = 0

                return tweetChannel.send(embed)
                
            }
        }
    }
}

module.exports = MessageListener;