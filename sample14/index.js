let path = require('path');
let fs = require('fs');
let util = require('util');

// 프로미스화
let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

// 파일읽기
// fs.readFile(path.join(__dirname, 'sample.txt'), 'utf8', (err, data) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
// console.log(data);

// 파일 쓰기
// fs.writeFile(path.join(__dirname, 'sample-copy.txt'), data, 'utf8', (err) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log('OK');
// });
// });

// 프로미스화 1
// readFile(path.join(__dirname, 'sample.txt'), 'utf8')
//   .then((data) => {
//     return writeFile('sample-copy.txt', data, 'utf8');
//   })
//   .then(() => {
//     console.log('OK');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// 프로미스화 2
(async function () {
  try {
    let data = await readFile(path.join(__dirname, 'sample.txt'), 'utf8');
    await writeFile(path.join(__dirname, 'sample-copy.txt'), data, 'utf8');
    console.log('OK');
  } catch (err) {
    console.log(err.message);
  }
})();
