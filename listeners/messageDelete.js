const { Listener } = require('discord-akairo');

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    async exec(message) {
        const starboard = message.guild.channels.cache.get('809139797264171028')

        const star = await message.client.sql`SELECT * FROM starboard WHERE id = ${message.id}`
        if(star.count) {
            message.client.sql`DELETE FROM starboard WHERE id = ${message.id}`
            starboard.messages.delete(star[0]._id)
        }
    }
}

module.exports = MessageDeleteListener