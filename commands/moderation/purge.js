const { Command } = require('discord-akairo');
const utils = require("./../../utils/utils.js")

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
           aliases: ['purge', 'clear'],
           args: [
                {
                    id: 'amt',
                    match: 'content',
                    type: 'integer',
                    default: 2
                }
           ]
        });
    }

    exec(message,args) {
        if (!utils.isStaff(message.member) || (args.amt < 1 || args.amt > 100)) return;
        message.channel.bulkDelete(args.amt)
        .then(messages => {
            message.channel.send(`Successfully cleared ${messages.size} messages`)
            .then(m => m.delete({timeout : 1000}));
        })
        .catch((err) => {console.log(err)});
    }
}

module.exports = PurgeCommand;