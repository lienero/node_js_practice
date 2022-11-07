let config = require('../config.js');
let { src, dest, series, parallel } = require('gulp');
let del = require('del');
// uglify-js : 경량화 도구로써 자바스크립트 코드에 대해 공백을 제거하거나 코드를 가볍게 만들어줌
let uglify = require('gulp-uglify');
let clean, minify;

clean = async function () {
  await del('./javascripts/**/*', { cwd: config.path.output });
};

minify = function () {
  return src('./javascripts/**/*', { cwd: config.path.input })
    .pipe(uglify(config.uglify))
    .pipe(dest('./javascripts', { cwd: config.path.output }));
};

module.exports = series(clean, minify);
