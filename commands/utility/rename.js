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
        const emojiIdentifier = content[0].slice(1, -1);
        const newName = content[1];
        const emoji = message.guild.emojis.cache.find(emoji => emoji.identifier === emojiIdentifier);
        await emoji.setName(newName);
        return message.reply(`Set name of the emoji to \`${newName}\``);
    }
}

module.exports = EmojiRenameCommand;