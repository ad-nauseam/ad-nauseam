const Tweet = require('../structures/Tweet');
const User = require('../structures/User')
const { Collection } = require('./export')

function _patchTweet(client, element) {
    const tweet = new Tweet(client, element)
    return tweet
}

function _patchUser(client, element) {
    const user = new User(client, element)
    return user
}

function tweetBuilder(client, tweetData) {
    if (tweetData instanceof Collection) {
        const tweetCollection = new Collection();
        tweetData.forEach(e => {
            tweetCollection.set(e.data.id, _patchTweet(client, e))
        })
        return tweetCollection
    } else {
        return _patchTweet(client, tweetData)
    }
}

function userBuilder(client, userData) {
    if (userData instanceof Collection) {
        const userCollection = new Collection();
        userData.forEach(e => {
            userCollection.set(e.data.id, _patchUser(client, e))
        })
        return userCollection
    } else {
        return _patchUser(client, userData)
    }
}

module.exports = { tweetBuilder, userBuilder }