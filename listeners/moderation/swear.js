const { Listener } = require("discord-akairo");

class SwearListener extends Listener {
    constructor() {
        super('swear', {
            emitter: 'client',
            event: 'message'
        })
    }
    async exec(message, args) {
        if(message.author?.bot) return;
        const wordArray = message.content.trim().split(/ +/g);
        wordArray.some(w => {
            if(this.client.swearWords.includes(w)){
                message.delete();
                return message.channel.send(`${message.author} you can't swear in this christian minecraft server`)
                .then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 3000);
                });
            }
        });
    }
}

module.exports = SwearListener;