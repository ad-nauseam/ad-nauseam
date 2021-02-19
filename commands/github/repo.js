const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const GithubClient = require('../../GitHubClient/client/Client.js');

const githubClient = new GithubClient();

class GitRepoCommand extends Command {
    constructor() {
        super('repo', {
           aliases: ['repo'],
           args: [
                {
                    id: 'owner',
                },
                {
                    id: 'repo',
                },
                {
                    id: 'commit',
                }
           ], 
           description: 'Looks up github repo, with optional commit or pr'
        });
    }

    async exec(message, args) {
        const owner = args.owner
        const repo = args.repo
        const commit = args.commit

        if(!owner) return message.reply('You need to supply an owner')
        if(!repo) return message.reply('You need to supply a repository')

        if (/[a-f0-9]{40}$/i.exec(commit)) {
            const body = await githubClient.api.repos(owner, repo).commits(commit).get()
            if (!body) {
                return message.reply("Im sorry, i could not find that repo!");
              }
              const embed = new MessageEmbed()
                .setColor(3447003)
                .setAuthor(
                  body.author?.login ?? "Unknown",
                  body.author?.avatar_url ?? "",
                  body.author?.html_url ?? ""
                )
                .setTitle(body.commit.message.split("\n")[0])
                .setURL(body.html_url)
                .setDescription(
                  `${body.commit.message
                    .replace("\r", "")
                    .replace("\n\n", "\n")
                    .split("\n")
                    .slice(1)
                    .join("\n")
                    .substring(0, 300)} ...
                        `
                )
                .addField(
                  "Stats",
                  `
                            • Total: ${body.stats.total}
                            • Additions: ${body.stats.additions}
                            • Deletions: ${body.stats.deletions}
                        `,
                  true
                )
                .addField(
                  "Committer",
                  body.committer
                    ? `• [**${body.committer.login}**](${body.committer.html_url})`
                    : "Unknown",
                  true
                )
                .setThumbnail(body.author?.avatar_url ?? "")
                .setTimestamp(new Date(body.commit.author.date));
        
              message.channel.send(embed);
        } else if (Number(commit)) {
            const body = await githubClient.api.repos(owner, repo).issues(commit).get()
            if(!body) return message.reply("Im sorry, i couldnt find that issue!")
            console.log(body)
            const embed = new MessageEmbed()
            .setColor(body.merged ? 0x9c27b0 : body.state === "OPEN" ? 0x43a047 : 0xef6c00)
            .setAuthor(
                body.user?.login ?? "Unknown",
                body.user?.avatar_url ?? "",
                body.user?.html_url ?? ""
              )
              .setURL(body.html_url)
              .setDescription(`${body.body.substring(0, 500)} ...`)
              .setTitle(body.title)
              .addField("State", body.state, true)
              .addField("Comments", body.comments, true)
              .addField(
                "Repo & Number",
                `${repo}#${body.number}`,
                true
              )
              .addField("Type", body.pull_request ? "PULL REQUEST" : "ISSUE", true)
              .addField(
                "Labels",
                body.labels.length
                  ? body.labels.map((node) => node.name)
                  : "NO LABEL(S)",
                true
              )
              .setThumbnail(body.user?.avatarUrl ?? "")
              .setTimestamp(new Date(body.created_at));

              return message.channel.send(embed)
        } else if (owner && repo && !commit) {
            const body = await githubClient.api.repos(owner, repo).get()
            if (!body) {
                return message.reply("Im sorry, i could not find that repo!");
              }
              const embed = new MessageEmbed()
                .setAuthor(
                  body.owner?.login ?? "Unknown",
                  body.owner?.avatar_url ?? "",
                  body.owner?.html_url ?? ""
                )
                .setTitle(body.name)
                .setURL(body.html_url)
                .setDescription(body.description || "None")
                .addFields(
                  { name: "Watchers", value: body.watchers, inline: true },
                  { name: "Forks", value: body.forks_count, inline: true },
                  { name: "Language", value: body.language },
                  {
                    name: "Last Push",
                    value: new Date(body.pushed_at).toLocaleString(),
                  }
                )
                .setThumbnail(body.owner?.avatar_url ?? "")
                .setFooter("Created")
                .setTimestamp(new Date(body.created_at).toLocaleDateString());
        
              return message.channel.send(embed);
        }
    }
}

module.exports = GitRepoCommand;
