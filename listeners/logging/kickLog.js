const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class KickLogListener extends Listener {
    constructor() {
        super('kickLog', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member, author) {
        let logChannel = member.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'clyde-logs');
        if ( !logChannel ) return;
        let audit = (await member.guild.fetchAuditLogs()).entries.first();
        if (Date.now() - audit.createdTimestamp > 5000) return;
        let executor = author || audit.executor;
        if ( executor.id == member.guild.me.user.id ) return;
        let reason = `${audit.reason?`\n**Reason : **${audit.reason}`:""}`;
        let embed = new MessageEmbed()
        .setAuthor(`${executor.tag} (${executor.id})`, executor.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**Member : **${member.user.tag}\n(${member.user.id})\n**Action : ** Kick${reason}`)
        .setColor('ORANGE')
        .setTimestamp();

        logChannel.send(embed);
    }
}

module.exports = KickLogListener;