let path = require('path');
let filepath = 'C:\\Lee\\node_js_practice\\sample13\\index.html';

console.log(path.dirname(filepath));
console.log(path.basename(filepath));
console.log(path.extname(filepath));

console.log(path.join('C:\\Lee\\node_js_practice\\sample13', 'index.html'));

console.log(path.normalize('C:\\Lee\\node_js_practice\\sample13\\lib\\..\\index.html'));
