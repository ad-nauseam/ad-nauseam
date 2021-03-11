const { Listener } = require('discord-akairo');
const fetch = require("node-fetch");

class IconListener extends Listener {
    constructor() {
        super('icon', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if(Math.random() > .1) return;
        if(message.channel.id !== "807877052447064084") return;
        const att = message.attachments.first();
        if(att) attIcon(message,att);
        else attLink(message);


    }
}

async function attIcon(message,att){
  if(att == undefined) return;
  const fileatt = /(\.(jpe?g|png|webp|gif))$/i.exec(att.url) || false;
  if(!att.height || !(att.size < 8388608) || !fileatt) return;
    const icon = await getRes(att.proxyURL);
    message.guild.setIcon(icon)
    .then(updated => message.reply('Updated the guild icon'))
    .catch(console.error);
}

async function attLink(message){
  const link = /https?:\/\/.+/.exec(message.content.split(" ")[0]) || false; //just winged the regex. may change later
  if(!link) return;
  const current = await getRes(message.guild.iconURL());
  const icon = await getRes(link);
  message.guild.setIcon(icon)
  .then(updated => message.reply('Updated the guild icon'))
  .catch(err => {});
  if(!message.guild.icon) message.guild.setIcon(current);
}

const getRes = async (url) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    return { error };
  }
};
module.exports = IconListener;