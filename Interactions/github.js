const GithubClient = require('../GitHubClient/client/Client')
const { MessageEmbed } = require('discord.js')

const git = new GithubClient()

function respond(client, interaction , message, hidden) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 3,
            data: {
                content: message,
                flags: hidden ? 64 : 0
            }
        }
    })
}

function respondEmbed(client, interaction , embeds = []) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                embeds
            }
        }
    })
}

module.exports = async (client, interaction) => {

    const sub = interaction.data.options[0].options[0]
    const values = sub.options.reduce(( res, key ) => {
        res[key.name] = key.value 
        return res
    }, {})

    const { author, repo } = values

    let embed

    if(sub.name == 'repo') {
        const body = await git.api.repos(author, repo).get()
        if(body.message == 'Not Found') {
            return respond(client, interaction, "Im sorry, i could not find that repo!", true);
          }

          embed = new MessageEmbed()
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
    }

    if(sub.name == 'issue') {
        const { number } = values
        const body = await git.api.repos(author, repo).issues(number).get()
        if(!body.user) return respond(client, interaction, 'Either the repo or the issue could not be found', hidden)

        embed = new MessageEmbed()
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
    }

    if(sub.name == 'commit') {
        const { commit } = values
        if(!/[a-f0-9]{40}$/i.exec(commit)) return respond(client, interaction, 'That is not a valid commit hash', true)

        const body = await git.api.repos(author, repo).commits(commit).get()
        if(!body.author) return respond(client, interaction, 'Either this repo or commit could not be found', true)

        embed = new MessageEmbed()
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
    }

    respondEmbed(client, interaction, [embed])
}