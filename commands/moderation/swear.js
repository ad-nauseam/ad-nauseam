const { Command, Flag } = require("discord-akairo");

class SwearCommand extends Command {
    constructor() {
        super('swear', {
            ownerOnly: true,
            aliases: ['swear', 'sw'],
            args: [{
                id: 'add',
                match: 'option',
                unordered: true,
                flag: ['-add', '-a']
            },
            {
                id: 'remove',
                match: 'option',
                unordered: true,
                flag: ['-remove', '-rm', '-r']
            },
            {
                id: 'list',
                match: 'flag',
                unordered: 'true',
                flag: ['-list', '-l']
            }]
        })
    }
    async exec(message, args) {
        let add = args.add ? [...args.add.split(',').filter(w => w)] : [];
        let remove = args.remove ? [...args.remove.split(',').filter(w => w)] : [];
        let added = 0;
        let removed = 0;     
            if(add.length > 0) {
                add.forEach(async a => {
                    if(this.client.swearWords.includes(a)) return;
                    added++;
                    this.client.swearWords.push(a);
                    await this.client.sql`update guild set swears = array_append(swears, ${a})`;
                })
            }
            if(remove.length > 0) {
                remove.forEach(async r => {
                    if(!this.client.swearWords.includes(r)) return;
                    removed++;
                    this.client.swearWords = this.client.swearWords.filter(w => w.toLowerCase() != r.toLowerCase());
                    await this.client.sql`update guild set swears = array_remove(swears, ${r})`;
                })
            }
        if(args.list){
            if(!removed && !added){
                return await message.channel.send(`\`\`\`${this.client.swearWords.join(',')}\`\`\``);
            }else{
                await message.channel.send(added ? !removed ? `Added **${added}** to the swear database` : `Added **${added}** and removed **${removed}** words to the swear database` : removed ? `Removed **${removed}** words from the swear database` : 'No Changes Were Made');
                return await message.channel.send(`\`\`\`${this.client.swearWords.join(',')}\`\`\``);
            }
        }else{
            return await message.channel.send(added ? !removed ? `Added **${added}** to the swear database` : `Added **${added}** and removed **${removed}** words to the swear database` : removed ? `Removed **${removed}** words from the swear database` : 'No Changes Were Made');
        }
    }
}

module.exports = SwearCommand;