const { EventEmitter } = require('events')
const fetch = require('node-fetch')
const { qs } = require('../util/export')
const { getHeaders, getUserHeaders } = require('./Headers')
const buildRoute = require('./EndpointRouter')

const base = `https://api.twitter.com/`

class RESTManager  extends EventEmitter {
    constructor(client) {
        super()
        this.client = client
    }

    get api() {
        return buildRoute(this)
    }

    async request(method, endpoint, data = {}) {
        const version = data.version == '1' ? '1.1' : data.version
        const query = data.query ? `?${qs(data.query)}` : ''

        let uri = `${base}${version || '2'}${endpoint}${query}`

        const auth = data.context == 'user' ? getUserHeaders(method, uri, this.client.tokens) : getHeaders(method, this.client.tokens.bearer)

        const res = await fetch(uri, auth)
        const json = await res.json()
        return json
    }
}

module.exports = RESTManager