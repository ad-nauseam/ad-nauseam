const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const GithubClient = require('../../GitHubClient/client/Client.js');

const githubClient = new GithubClient();

class GitCommand extends Command {
    constructor() {
        super('git', {
           aliases: ['git'],
           args: [
                {
                    id: 'con',
                    match: 'content'
                }
           ]
        });
    }

    async exec(message, args) {
        const res = await githubClient.api.users(args.con).get();
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setThumbnail(res.avatar_url)
        .setDescription(
            `Name: ${res.name}
            Company: ${res.company}
            Location: ${res.location}
            Bio: ${res.bio}
            Twitter: ${res.twitter_username}
            Public Repos: ${res.public_repos}
            Followers: ${res.followers}
            Following: ${res.following}
            Created: \`${res.created_at}\``
        )
        .setColor(message.member.displayHexColor);

        return message.reply(embed);
    }
}

module.exports = GitCommand;