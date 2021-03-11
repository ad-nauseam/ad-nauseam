const { Listener } = require('discord-akairo');

class MessageReactionRemoveListener extends Listener {
    constructor() {
        super('messageReactionRemove', {
            emitter: 'client',
            event: 'messageReactionRemove'
        });
    }

    async exec(reaction, user) {

        const { id, token } = reaction.client.config.webhook

        if(reaction.partial) await reaction.fetch()
        if(reaction.message.partial) await reaction.message.fetch()
        if(user.partial) await user.fetch()

        const { guild } = reaction.message
        const starboard = guild.channels.cache.get('809139797264171028')

        if(reaction.emoji.name === '⭐') {
            const { count } = reaction
            const star = await reaction.client.sql`SELECT * FROM starboard WHERE id = ${reaction.message.id}`

            if(!star) return
            
            if(!count) {
                reaction.client.sql`DELETE FROM starboard WHERE id = ${reaction.message.id}`
                starboard.messages.delete(star[0]._id).catch(e=>e)
            } else {
                await reaction.client.sql`UPDATE starboard SET count = ${star[0].count - 1} WHERE id = ${reaction.message.id}`
                const m = (await starboard.messages.fetch(star[0]._id))
                if(!m.embeds[0]) return
                    m.embeds[0].footer.text = `${reaction.count} ⭐\u2009\u200b`

                    return m.editWebhook({
                            embeds: [m.embeds[0], ...reaction.message.embeds.filter(t => ['link', 'rich'].includes(t.type))]
                    })
            }
        }
    }
}

module.exports = MessageReactionRemoveListener