let { echo, area } = require('./methods');
let Lamborgini = require('./lamborgini');
let config = require('./config');
echo('Hello world !');
console.log(area(5, 10));

let car = new Lamborgini('lamborgini');
car.echo();
car.drive();

console.log(JSON.stringify(config));
