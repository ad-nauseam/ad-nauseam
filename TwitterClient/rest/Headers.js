const crypto = require('crypto')
const OAuth = require('oauth-1.0a')

function getUserHeaders(method, endpoint, token) {
    const { apikey, secret, user } = token
    const oauth = new OAuth({
        consumer: {
            key: apikey,
            secret: secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto.createHmac('sha1', key).update(base_string).digest('base64')
        }
    })

    const userContextAuth = oauth.authorize(
        {
            url: endpoint.toString(),
            method
        },
        {
            key: user.token,
            secret: user.secret
        }
    )

    const headerObject = {
        method,
        headers: {
            'Content-Type': 'application.json',
            Authorization: oauth.toHeader(userContextAuth).Authorization,
        },
    }

    return headerObject;
}

function getHeaders(method, token) {
    const headerObject = {
        method,
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return headerObject
}

module.exports = { getUserHeaders, getHeaders }