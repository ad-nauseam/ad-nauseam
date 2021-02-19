'use strict';

const { EventEmitter } = require('events');
const RESTManager = require('../rest/RESTManager.js');
const { DefaultClientOptions } = require('../util/Constants.js');
const { mergeDefault } = require('../util/Util.js');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();

        this.options = mergeDefault(DefaultClientOptions, options);

        this.rest = new RESTManager(this);
    }

    get api() {
        return this.rest.api;
    }
}

module.exports = Client;