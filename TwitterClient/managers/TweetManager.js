const BaseManager = require('./BaseManager')
const Tweet = require('../structures/Tweet')
const { tweetBuilder } = require('../util/StructureBuilder')

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

class TweetManager extends BaseManager {
    constructor(client){
        super(client, Tweet);

        this.tweetBuilder = tweetBuilder
    }

    async fetch(id) {
        if(!id) throw new Error('Tweet Invalid')
        const tweetID = this.resolveID(id)
        if(tweetID) {
            const cachedTweet = this.cache.get(tweetID)
            if(cachedTweet) return cachedTweet
            const tweetData = await this._fetchSingle(id)
            const tweet = tweetBuilder(this.client, tweetData)
            this.cache.set(tweet.id, tweet)
            if(this.cache.size > 100) this.cache.delete(this.cache.first())
            return tweet
        }
    }

    async _fetchSingle(q) {
        return this.client.api.tweets(q).get({ query: { 
            "tweet.fields": tweetFields, 
            "user.fields": userFields, 
            "media.fields": mediaFields, 
            "place.fields": placeFields, 
            "poll.fields": pollFields,
            expansions: expansionsForTweet,
         } })
    }


}

module.exports = TweetManager