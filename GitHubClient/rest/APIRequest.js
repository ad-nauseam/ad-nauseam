'use strict';

const fetch = require('node-fetch');

class APIRequest {
  constructor(rest, method, path, options) {
    this.rest = rest;
    this.method = method;
    this.path = path;
    this.client = rest.client;
    this.options = options;

    if (options.query) {
      let queryString = Object.entries(options.query)
        .filter(([, value]) => value !== null && typeof value !== 'undefined')
        .map(([key, value]) => (Array.isArray(value) ? `${key}=${value.join(',')}` : `${key}=${value}`))
        .join('&');

      this.path = `${path}?${queryString}`;
    }
  }

  make() {
    const API = `${this.client.options.http.api}`;
    const url = API + this.path;

    let body;
    if (this.method !== 'get') {
      body = JSON.stringify(this.options.body);
      headers['Content-Type'] = 'application/json';
    }

    let headers;

    return fetch(url, {
      method: this.method,
      headers,
      body,
    }).then(res => res.json());
  }
}

module.exports = APIRequest;