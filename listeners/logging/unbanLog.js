const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class UnbanLogListener extends Listener {
    constructor() {
        super('unbanLog', {
            emitter: 'client',
            event: 'guildBanRemove'
        });
    }

    async exec(guild, user, author) {
        let logChannel = guild.channels.cache.find(ch => ch.name.toLowerCase() == 'clyde-logs');
        if ( !logChannel ) return;
        let audit = (await guild.fetchAuditLogs()).entries.first();
        let executor = author || audit.executor;
        if ( executor.id == guild.me.user.id ) return;
        let reason = `${audit.reason?`\n**Reason : **${audit.reason}`:""}`;
        let embed = new MessageEmbed()
        .setAuthor(`${executor.tag} (${executor.id})`, executor.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setDescription(`**Member : **${user.tag}\n(${user.id})\n**Action : ** Unban${reason}`)
        .setColor('GREEN')
        .setTimestamp();

        logChannel.send(embed);
    }
}

module.exports = UnbanLogListener;