var path = require('path');
var fs = require('fs');

let render = fs.createReadStream(path.join(__dirname, 'sample.txt'), 'utf8');
let writer = fs.createWriteStream(path.join(__dirname, 'sample-copy.txt'), 'utf8');
render.pipe(writer);
render.resume();
