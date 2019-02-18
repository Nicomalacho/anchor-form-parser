const PropertyBuilder = require('./propertyBuilder');
const OptionBuilder = require('./optionBuilder');
const _ = require('lodash');

class Scheme {
  constructor(constanst) {
    this.basicObject = { "schema": { "type": "object" } };
    this.constanst = constanst
    this.setDefaultProperties();
    this.setDefaultOptions();
  }
  setDefaultProperties() {    
    _.each(this.constanst.properties, (defaultProperty, key) => {
      let property = new PropertyBuilder(key, defaultProperty)
      this.setKey(`schema.properties.${property.name}`, property.toJson());
    })
  }
  setDefaultOptions() {    
    _.each(this.constanst.options.fields, (defaultOption, key) => {
      let option = new OptionBuilder(key, defaultOption)
      this.setKey(`options.fields.${option.name}`, option.toJson());
    })
  }
  toJson() {
    return this.basicObject;
  }
  setKey(path, value) {
    var schema = this.basicObject;
    var pList = path.split('.');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i];
      if (!schema[elem]) schema[elem] = {}
      schema = schema[elem];
    }
    schema[pList[len - 1]] = value;
  }
}

module.exports = Scheme;