'use strict';

const APIRequest = require('./APIRequest.js');
const { buildRoute } = require('./APIRouter.js');

/**
 * Manager class for the rest API
 * @private
 */
class RESTManager {
  /**
   * @param {Client} client The client that instantiated this class
   */
  constructor(client) {
    /**
     * @type {Client}
     */
    this.client = client;
  }

  get api() {
    return buildRoute(this);
  }

  get endpoint() {
    return this.client.options.http.api;
  }

  request(method, url, options) {
    const apiRequest = new APIRequest(this, method, url, options);
    return apiRequest.make();
  }
}

module.exports = RESTManager;