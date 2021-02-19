
class BaseStructure {
  
  constructor(client) {

    Object.defineProperty(this, 'client', { value: client });
  }
}

module.exports = BaseStructure;
