const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class MessageReactionAddListener extends Listener {
    constructor() {
        super('messageReactionAdd', {
            emitter: 'client',
            event: 'messageReactionAdd'
        });
    }

    async exec(reaction, user) {

        

        const { id, token } = reaction.client.config.webhook

        if(reaction.partial) await reaction.fetch()
        if(reaction.message.partial) await reaction.message.fetch()
        if(user.partial) await user.fetch()

        if(user.bot) return
        if(reaction.message.author.id == user.id) return

        
        const webhook = await reaction.client.fetchWebhook(id, token)
        const { guild } = reaction.message
        const member = await guild.members.fetch(user)
        const starboard = guild.channels.cache.get('809139797264171028')

        if(reaction.emoji.name === '⭐' && member.roles.highest.rawPosition >= guild.roles.cache.get('806673323463278622').rawPosition) {
            
                let stars = await reaction.client.sql`SELECT * FROM starboard WHERE id = ${reaction.message.id}`

                if(stars.count) {
                    const m = (await starboard.messages.fetch(stars[0]._id))
                    m.embeds[0].footer.text = `${reaction.count} ⭐\u2009\u200b`

                    await reaction.client.sql`UPDATE starboard SET count = ${stars[0].count + 1} WHERE id = ${reaction.message.id}`

                    return m.editWebhook('', {
                            embeds: [m.embeds[0], ...reaction.message.embeds.filter(t => ['link', 'rich'].includes(t.type))]
                    })
                    
                }

                let image = reaction.message.attachments.first()?.url || reaction.message.embeds[0]?.url

                const embed = new MessageEmbed()
                .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                .addFields(
                    { name: 'Jump To Message', value: `[Click Here](${reaction.message.url})`}
                )
                .setDescription(reaction.message.content)
                .setTimestamp()
                .setFooter(`1 ⭐\u2009\u200b`)
                .setImage(image)
                .setColor('PURPLE')

            const star = await webhook.send('', {
                name: 'Starboard',
                avatar: reaction.client.user.displayAvatarURL(),
                embeds: [embed, ...reaction.message.embeds.filter(t => ['link', 'rich'].includes(t.type))],
            })

            await reaction.client.sql`INSERT INTO starboard(id, _id, count) values(${reaction.message.id}, ${star.id}, 1)`
        }
    }
}

module.exports = MessageReactionAddListener