let config = require('../config.js');
let { src, dest, series, parallel } = require('gulp');
let del = require('del');
let clean, copy;

clean = async function () {
  await del('/public/source//images/**/*', { cwd: config.path.output });
};

copy = function () {
  // dest(path) : 파일의 출력장소 지정
  return src('./images/**/*', { cwd: config.path.input }).pipe(dest('./images', { cwd: config.path.output }));
};

module.exports = series(clean, copy);
