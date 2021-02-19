const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const vm = require('vm')
const dapi = require('discord-api-types')

const clean = (text) => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };

class EvalCommand extends Command {
    constructor() {
        super('eval', {
           aliases: ['eval', 'ev'],
           ownerOnly: true,
           args: [
                {
                    id: 'code',
                    match: 'content'
                }
           ]
        });
    }

    async exec(message,args) {

      if(!args.code) return

        let evaled = { message, fetch, dapi, client: message.client }
        let code = args.code
            .replace(/(^`{1,3}|(?<=```)js)|`{1,3}$/g, "")
            .trim();

      if(code.includes('token')) return

      try {
        const script = new vm.Script(`( async () => {
                   ${code}
        })()`)
        evaled = vm.createContext(evaled)

        evaled = await script.runInContext(evaled);
      } catch (err) {
        return message.channel.send(
          `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``
        );
      }


    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled, { depth: 0 });

    evaled = evaled.replace(
      message.client.token,
      "YOU THOUGHT 🤣"
    );

    let cleanCode = clean(evaled);
    let io = `**Input:**\`\`\`js\n${code}\n\`\`\`**Output:**\`\`\`js\n${cleanCode}\n\`\`\``;

    let embed = new MessageEmbed()
      .setTitle("EVAL")
      .setDescription(io)
      .setTimestamp();

    if (embed.description.length > 2048) {
      return message.channel.send(io, { split: true, code: "js" });
    }

    message.channel.send({
      embed,
    });
    }
}

module.exports = EvalCommand;