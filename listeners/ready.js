const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    exec() {
        console.log('Bot is ready');
    }
}

module.exports = ReadyListener;