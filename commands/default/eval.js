const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const vm = require('vm')
const dapi = require('discord-api-types');
const { strict } = require('assert');

const clean = (text) => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };

  function toHex(str) {
    return str
              .split('')
              .map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))
              .join(' ');
  }

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

        let evaled
        let code = args.code
            .replace(/(^`{1,3}|(?<=```)js)|`{1,3}$/g, "")
            .trim();

      try {
        evaled = await eval(`( async () => {
                   ${code}
        })()`)
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