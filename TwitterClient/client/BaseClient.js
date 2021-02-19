const { EventEmitter } = require('events')

class BaseClient extends EventEmitter {
    constructor() {
        super()
    }
}

module.exports = BaseClient