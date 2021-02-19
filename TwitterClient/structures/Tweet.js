const { CategoryChannel } = require('discord.js');
const BaseStructure = require('./BaseStructure')


class Tweet extends BaseStructure {

    constructor(client, tweet) {
      super(client);

      this.raw = tweet
    
      this.id = tweet.data.id;

      this.text = tweet.data.text;

      this.source = tweet.data.source

      this.author = tweet.includes.users[0]

      this.lang = tweet.data.lang

      this.createdAt = tweet.data.created_at

      this.timestamp = new Date(this.createdAt).getTime()

      this.conversation = tweet.data.conversation_id

      this.possibly_sensitive = tweet.data.possibly_sensitive

      this.reply_settings = tweet.data.reply_settings
    }
  }

module.exports = Tweet;
