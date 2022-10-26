// let randomstring = require('./randomstring');
// console.log(randomstring());

let CustomReader = require('./customreader');
let reader = new CustomReader();
reader.on('data', (chunk) => {
  console.log(chunk);
});
reader.resume();
