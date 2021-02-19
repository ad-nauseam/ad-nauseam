const BaseClient = require('./BaseClient')
const RESTManager = require('../rest/RESTManager')
const TweetManager = require('../managers/TweetManager')
const UserManager = require('../managers/UserManager')

class Client extends BaseClient {
    constructor() {
        super()

        this.readyAt = null
        this.rest = new RESTManager(this)

        this.tweets = new TweetManager(this)
        this.users = new UserManager(this)
    }

    get api() {
        return this.rest.api
    }

    async tweet(status) {
        if(!status) return new Error('Status must be provided!');

        const res = await this.api.statuses('update.json').post({ version: '1', query: { status }, context: 'user' })
        return res
    }

    init(tokens) {
        if(!tokens) {
            throw new Error('NO TOKEN PROVIDED!')
        }
        this.tokens = tokens
        this.readyAt = new Date();
        this.emit('ready', this)
        return this
    }

    
}

module.exports = Client