const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const config = require('./config.js')
const fs = require('fs')
const TwitterClient = (new (require('./TwitterClient/client/Client'))).init(config.keyring.twitter);
const sql = require('postgres')(config.postgres);
const { Intents } = require('discord.js');

class ClydeClient extends AkairoClient {
    constructor() {
        super({
            ownerID: ['695636750302838865', '372516983129767938', '620567262004248596', '398967501662322701', '320546614857170945', '744429639417593896']
        }, {
            allowedMentions: {
                parse: ['roles', 'users']
            },
            ws: {
                properties: {
                    $browser: 'Discord Android'
                }
            },
            partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER', 'CHANNEL'],
            intents: [Intents.NON_PRIVILEGED]
        });
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: config.prefix // or ['?', '!']
        });
        if(config.isMain){
            this.listenerHandler = new ListenerHandler(this, {
                directory: './listeners/'
        });}

        this.config = config
        this.sql = sql
        this.swearWords = [];
        
        this.commandHandler.useListenerHandler(this.listenerHandler);
        if(config.isMain){
            this.listenerHandler.loadAll();
        }
        this.commandHandler.loadAll();
        this.twitter = TwitterClient

        fs.readdir('./Structures', (err, files) => {
            if (err) throw err
            const jsfiles = files.filter(f => f.endsWith('.js'))
            jsfiles.forEach(file => {
                require(`./Structures/${file}`)
            })
        });
    }
    init = async() => {
        await sql`select * from guild`
        .then(q => {
            if(!q[0].swears) return;
            this.swearWords = q[0].swears
            console.log(`Loaded Guild Configs`)
        })        
        .catch(console.error)
        .finally(() => this.login(config.token))
        // loads db based guild configs(only swear words for now) before logging in[pls forgib me for making yet again another bloat. can remove if you want] 
        if(config.isMain) {
        this.ws.on('INTERACTION_CREATE', (interaction) => {
            const name = interaction.data.name
            require(`./Interactions/${name}.js`)(this, interaction)
        })
    }
    }
}

const client = new ClydeClient();
client.init()/*.then(async () => {
    console.log(await (require('./Interactions/commands/github'))(client))
})*/

