const { Command } = require('discord-akairo');
const renderLottie = require('puppeteer-lottie')
const fetch = require('node-fetch')
const path = require('path')
const { MessageAttachment } = require('discord.js')

class StealStickerCommand extends Command {
    constructor() {
        super('stealsticker', {
           aliases: ['stealsticker'],
           ownerOnly: true,
           args: [
                {
                    id: 'id'
                }
           ]
        });
    }

    async exec(message, args) {
        const isID = /\d{17,19}/.test(args.id)
        if(!isID) return message.reply('Please provide a valid message id!')

        const sticker = (await message.channel.messages.fetch(args.id)).stickers?.first()
        if(!sticker) return message.reply('This message doesnt have a sticker!')

        const res = await fetch(sticker.url).then(res=> sticker.formatType == 3 ? res.json() : res.buffer() )
        if(!res) return message.reply('Could not fetch sticker!')

        const loading = await message.channel.send('<a:loading:812057659237859458> Loading...')

        if (sticker.formatType == 2) {
            const attachment = new MessageAttachment(res, 'sticker.png')
            return loading.delete() && message.channel.send(attachment)
        }

        await renderLottie({
            animationData: res,
            output: 'sticker.gif',
            width: 640,
            height: 640
        })

        return loading.delete() && message.channel.send({
            files: [{
                attachment: path.join(__dirname, '..', '..', 'sticker.gif'),
                name: 'sticker.gif'
            }]
        })
    }
}

module.exports = StealStickerCommand;