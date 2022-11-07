let config = require('./gulp/config.js');
let { series, parallel } = require('gulp');
let load = require('require-dir');
let tasks, development, production;

tasks = load('./gulp/tasks', { require: true });

development = series(
  tasks['clean-log'],
  tasks['copy-third_party'],
  tasks['copy-images'],
  tasks['copy-javascripts'],
  tasks['compile-sass'],
);

production = series(
  tasks['clean-log'],
  tasks['copy-third_party'],
  tasks['copy-images'],
  tasks['minify-javascripts'],
  tasks['compile-sass'],
);

module.exports = {
  development,
  production,
  default: config.env.IS_DEVELOPMENT ? development : production,
};
