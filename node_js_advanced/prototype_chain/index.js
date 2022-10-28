let util = {};

util.inherits = function (child, parent) {
  child.prototype = parent.prototype;
  child.prototype.constructor = parent;
};

util.base = function (self, ...args) {
  let prototype = Object.getPrototypeOf(self);
  prototype.constructor.apply(self, args);
};

let Animal = function () {
  this.message = 'hoge';
};

Animal.prototype = {
  message: '.....',
  say: function () {
    return this.message;
  },
};

// let Dog = function () {
//   this.message = 'わんわん';
// };
// Dog.prototype = Animal.prototype;

let Dog = function () {
  util.base(this);
  this.message = 'わんわん';
};
util.inherits(Dog, Animal);

let dog = new Dog();

console.log(dog.say());
