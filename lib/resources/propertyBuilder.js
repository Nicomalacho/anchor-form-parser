class PropertyBuilder {
  constructor(name, field) {
    this.name = name;
    this.type = field.choices ? 'select' : 'string';
    this.required = !field.optional;
    this.enum = field.choices;
  }
  toJson() {
    let object = {
      "type": this.type,
      "title": this.name,
      "required": this.required? this.required: false,
    }
    this.enum ? object["enum"] = this.enum : null;
    return object;
  }
}


module.exports = PropertyBuilder
