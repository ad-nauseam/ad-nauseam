const { Structures, APIMessage, Collection } = require('discord.js')

Structures.extend("Message", C => class extends C {
    constructor(...args) {
        super(...args)


        if(args[1].stickers) {
            const stickers = new Collection()
            args[1].stickers.forEach(sticker => {
                stickers.set(sticker.name, new Sticker(sticker))
            })
            this.stickers = stickers
        }  else {
            this.stickers = null
        }
        

        this.remove = async (timeout) => {

            if (timeout) {
              await require("util").promisify(setTimeout)(timeout);
            }
            return await this.delete();
          };


        this.editWebhook = async (content, options) => {
            if(!this.webhookID) return null
            const webhook = await this.fetchWebhook()
            const { id, token } = webhook
            const { data } = content instanceof APIMessage ? content.resolveData() : APIMessage.create(webhook, content, options).resolveData()
            return this.client.api.webhooks(id, token).messages(this.id).patch({ data }).then(d => {
                const clone = this._clone();
                clone._patch(d);
                return clone;
            })
        }
    }
})

class Sticker {
    constructor(sticker) {
        this.tags = sticker.tags
        this.packID = sticker.pack_id
        this.previewAsset = sticker.preview_asset
        this.name = sticker.name
        this.id = sticker.id
        this.formatType = sticker.format_type
        this.description = sticker.description
        this.asset = sticker.asset
        this.url = this.formatType == 3 ? `https://discord.com/stickers/${this.id}/${this.asset}.json` : `https://media.discordapp.net/stickers/${this.id}/${this.asset}.png?size=256`
    }
}