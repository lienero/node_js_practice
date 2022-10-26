let http = require('http');
let url = 'http://localhost:3000/';
let options = {
  method: 'GET',
};
let req = http.request(url, options, (res) => {
  res.pipe(process.stdout);
});
req.end();
