const { Command } = require('discord-akairo');

class EmojiDeleteCommand extends Command {
    constructor() {
        super('delete', {
           aliases: ['delete'],
           ownerOnly: true,
           args: [
                {
                    id: 'con',
                    match: 'content'
                }
           ]
        });
    }

    async exec(message, args) {
        const content = args.con.trim().split(/ +/);
        const emojiIdentifier = content[0].slice(2, -1);
        const reason = content[1];
        const emoji = message.guild.emojis.cache.find(emoji => emoji.identifier === emojiIdentifier);
        await emoji.delete(reason);
        return message.channel.send('Deleted the emoji.');
    }
}

module.exports = EmojiDeleteCommand;