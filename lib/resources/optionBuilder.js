class OptionBuilder {
  constructor(name, option) {
    this.name = name;
    this.type = option.choices? 'select': null;
    this.size = option.size;
    this.optionLabels = option.choices;
    this.helper = option.description
  }
  toJson() {
    let object = {}
    this.size ? object["size"] = this.size : null;
    this.type ? object["type"] = this.type : null;
    this.optionLabels ? object["optionLabels"] = this.optionLabels : null;
    this.helper ? object["helper"] = this.helper : null;
    
    return object;
  }
}

module.exports = OptionBuilder;