'use strict';

const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

function mergeDefault(defaultObject, given) {
  if (!given) return defaultObject;
  for (const key in defaultObject) {
    if (!has(given, key) || given[key] === undefined) {
      given[key] = defaultObject[key];
    } else if (given[key] === Object(given[key])) {
      given[key] = mergeDefault(defaultObject[key], given[key]);
    }
  }
  return given;
}

module.exports = { mergeDefault }