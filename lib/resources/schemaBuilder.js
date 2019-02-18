const Scheme = require('./scheme');
const PropertyBuilder = require('./propertyBuilder');
const OptionBuilder = require('./optionBuilder');
const _ = require('lodash');

class SchemaBuilder {
  constructor(anchor) {
    this.anchor = anchor;
  }
  async generateDepositScheme() {
    let info = await this.anchor.getInfo();
    let code = this.anchor.code;
    return this.buildDepositSchemeByAsset(info.deposit, code);
  }

  async generateWithdrawSchemes() {
    let info = await this.anchor.getInfo();
    let code = this.anchor.code;
    return this.buildWithdrawSchemesByAsset(info.withdraw, code);
  }

  buildDepositSchemeByAsset(deposit, asset) {
    let scheme = new Scheme();
    scheme.setKey('schema.title', `Deposit ${asset}`);
    _.each(deposit[asset].fields, (field, key) => {
      let property = new PropertyBuilder(key, field)
      scheme.setKey(`schema.properties.${property.name}`, property.toJson());
      let option = new OptionBuilder(key, field)
      scheme.setKey(`options.fields.${property.name}`, option.toJson());
    })
    return scheme.toJson();
  }

  buildWithdrawSchemesByAsset(withdraw, asset) {
    let schemes = {};
    _.each(withdraw[asset].types, (type, key) => {
      let scheme = new Scheme();
      scheme.setKey('schema.title', `Withdraw ${asset} in ${key}`);
      _.each(type.fields, (field, key) => {
        let property = new PropertyBuilder(key, field)
        scheme.setKey(`schema.properties.${property.name}`, property.toJson());
        let option = new OptionBuilder(key, field)
        scheme.setKey(`options.fields.${property.name}`, option.toJson());
      })
      schemes[key] = scheme.toJson();
    })
    return schemes;
  }
}

module.exports = SchemaBuilder;