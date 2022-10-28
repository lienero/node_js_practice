let Fibonacci = function () {
  this.val0 = 0;
  this.val1 = 1;
  this.timerId = undefined;
};

Fibonacci.prototype.start = function () {
  if (this.timerId) {
    this.stop();
  }
  let self = this;

  this.timerId = setInterval(() => {
    console.log(self.val0);

    let val2 = self.val0 + self.val1;
    self.val0 = self.val1;
    self.val1 = val2;
  }, 1000);
};

Fibonacci.prototype.stop = function () {
  if (this.timerId) {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }
};

let fibonnaci = new Fibonacci();
fibonnaci.start();
