var Car = class {
  constructor(name) {
    this.name = name;
  }

  drive() {
    console.log('zoom zoom ...');
  }
};

var Lamborghini = class extends Car {
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

var car = new Lamborghini('lamborghini');
car.echo();
car.drive();
