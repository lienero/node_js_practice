var path = require('path');
var fs = require('fs');

let data = '';

let render = fs.createReadStream(path.join(__dirname, 'sample.txt'), 'utf8');
render.on('data', (chunk) => {
  data += chunk;
});
render.on('end', () => {
  console.log(data);
});

render.resume();
