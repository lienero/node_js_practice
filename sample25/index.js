let { fork } = require('child_process');
let path = require('path');

let child = fork(path.join(__dirname, 'child.js'), { execArgv: [] });
child.on('message', (data) => {
  console.log(data);
});
child.on('close', (code) => {
  console.log(`Child process exit with code ${code}`);
});
