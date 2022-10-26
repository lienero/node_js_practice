let http = require('http');
let fs = require('fs');
let path = require('path');

let server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString}] ` + `${req.method} ${req.url}` + `${req.headers['user-agent']}`);
  if (req.method === 'POST') {
    // pipe() 함수는 모든 객체를 합치(연결하)며, 왼쪽에서 오른쪽으로 진행됩니다.
    req.pipe(res);
  } else {
    let reader = fs.createReadStream(path.join(__dirname, 'sample.txt'), 'utf8');
    reader.pipe(res);
  }
});
server.listen(3000);
