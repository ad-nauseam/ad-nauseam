const { Listener } = require('discord-akairo');

class MessageReactionRemoveAllListener extends Listener {
    constructor() {
        super('messageReactionRemoveAll', {
            emitter: 'client',
            event: 'messageReactionRemoveAll'
        });
    }

    async exec(message) {
        if (message.partial) await message.fetch()
        const starboard = message.guild.channels.cache.get('809139797264171028')

        const star = await message.client.sql`SELECT * FROM starboard WHERE id = ${message.id}`
        if(star.count) {
            message.client.sql`DELETE FROM starboard WHERE id = ${message.id}`
            starboard.messages.delete(star[0]._id)
        }
    }
}

module.exports = MessageReactionRemoveAllListener