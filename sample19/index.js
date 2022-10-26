let http = require('http');
let server = http.createServer((req, res) => {
  res.end('Hello world');
});
server.listen(3000);
