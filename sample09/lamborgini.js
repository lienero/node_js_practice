let Car = require('./car');

let Lamborgini = class extends Car {
  constructor(name) {
    super(name);
  }

  echo() {
    super.drive();
  }

  drive() {
    console.log(`fire ${this.name}`);
  }
};

module.exports = Lamborgini;
