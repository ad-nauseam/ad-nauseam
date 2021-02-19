const { Listener } = require('discord-akairo');
const { createCanvas, loadImage, registerFont } = require('canvas');
const Discord = require('discord.js');
class WelcomeListener extends Listener {
    constructor() {
        super('welcome', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {
        
        let welcomeChannel = member.guild.channels.cache.find(x => x.name == "welcome");
        if(!welcomeChannel) return;

        registerFont("files/fonts/Satisfy.ttf", { family: 'Blithen'});
        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');
        const img = await loadImage("files/images/welcome.png");
        const pfp = await loadImage(member.user.displayAvatarURL({'format' : 'png', 'size' : 1024}));
        let fontSize = 200;

        ctx.textAlign = 'center';
        ctx.font = `${fontSize}px "Blithen"`;
        ctx.fillStyle = 'white';

        ctx.drawImage(img, 0, 0);
        ctx.fillText(`to ${member.guild.name}!`, 960, 900);

        while(ctx.measureText(`Welcome, ${member.user.tag}`).width > 1920){
            fontSize -= 10;
            ctx.font = `${fontSize}px "Blithen"`;
        }

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height/2, 180, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillText(`Welcome, ${member.user.tag}`, 960, 240);
        ctx.clip();
        ctx.drawImage(pfp, canvas.width / 2 - 180, canvas.height/2 - 180, 360, 360);

        let data = canvas.toBuffer();
        const attachment = new Discord.MessageAttachment(data , 'test.png');
        welcomeChannel.send(`Welcome, ${member}`, attachment);

    }
}

module.exports = WelcomeListener;