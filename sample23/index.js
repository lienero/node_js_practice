let http = require('http');
let data = 'Hello World !';
let url = 'http://localhost:3000/';
let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(data),
  },
};
let request = http.request(url, options, (response) => {
  response.pipe(process.stdout);
});
request.on('error', (err) => {
  console.log(err.message);
});
request.end();
