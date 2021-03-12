const { Command } = require('discord-akairo');

class EmojiRenameCommand extends Command {
    constructor() {
        super('rename', {
           aliases: ['rename'],
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
        const newName = content[1];
        const emoji = await message.guild.emojis.cache.find(emoji => emoji.identifier === emojiIdentifier);
        await emoji.setName(newName);
        return message.channel.send(`Set name of the emoji to \`${newName}\``);
    }
}

module.exports = EmojiRenameCommand;