const { Collection } = require('../util/export')

class BaseManager {
    constructor(client, structureType) {
        this.client = client
        this.cache = new Collection()
        this.structureType = structureType
    }

    resolve(structureResolveable) {
        if (structureResolveable instanceof this.structureType) return structureResolveable
        if (typeof structureResolveable === 'string') return this.cache.get(structureResolveable)
        return null
    }

    resolveID(structureResolveable) {
        if (structureResolveable instanceof this.structureType) return structureResolveable.id
        if (typeof structureResolveable == 'string' && /^\d{1,}$/.test(structureResolveable)) return structureResolveable;
        return null;
    }
}

module.exports = BaseManager