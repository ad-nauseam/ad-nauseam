const BaseManager = require('./BaseManager')
const User = require('../structures/User')
const { userBuilder } = require('../util/StructureBuilder')

// endpoint fields
const userFields =
  'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

const tweetFields =
  'attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld';

const mediaFields = 'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics';

const placeFields = 'contained_within,country,country_code,full_name,geo,id,name,place_type';

const pollFields = 'duration_minutes,end_datetime,id,options,voting_status';

// endpoint expansions
const expansionsForTweet =
  'attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id';

const expansionsForUser = 'pinned_tweet_id';

class UserManager extends BaseManager {
    constructor(client) {
        super(client, User)
    }

    async fetch(options) {
        if(!options) return new Error('Invalid options')
        const id = this.resolveID(options)
        if(id) {
            const cachedUser = this.cache.get(id) 
            if(cachedUser) return cachedUser
            const userdata = await this._fetchSingleByID(options)
            const user = userBuilder(this.client, userdata)
            this.cache.set(user.id, user)
            return user
        }
        const cachedUser = this.cache.find(n => n.username == id)
        if (cachedUser) return cachedUser
        const userdata = await this._fetchSingleByUser(options)
        const user = userBuilder(this.client, userdata)
            this.cache.set(user.id, user)
            return user
    }

    async _fetchSingleByUser(q) {
        return this.client.api.users.by.username(q).get({ query: {
            "tweet.fields": tweetFields,
            "user.fields": userFields
            }
        })
    }

    async _fetchSingleByID(q) {
        return this.client.api.users(q).get()
    }
}

module.exports = UserManager