let CustomReader = require('./customreader');
let CustomWriter = require('./customwriter');

let reader = new CustomReader();
let writer = new CustomWriter();
reader.pipe(writer);
reader.resume();
