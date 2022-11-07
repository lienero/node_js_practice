let config = require('../config.js');
let { src, dest, series, parallel } = require('gulp');
let del = require('del');
const sass = require('gulp-sass')(require('sass'));
let clean, compile;

clean = async function () {
  await del('./stylesheets/**/*', { cwd: config.path.output });
};

compile = function () {
  return src('./stylesheets/**/*.scss', { cwd: config.path.input })
    .pipe(sass(config.sass))
    .pipe(dest('./stylesheets', { cwd: config.path.output }));
};

module.exports = series(clean, compile);
