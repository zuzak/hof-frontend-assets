'use strict';

const witch = require('witch');
const path = require('path');
const cwd = process.cwd();
const target = path.resolve(cwd, 'public');
const source = path.resolve(__dirname, '../src');
const npmsass = witch('npm-sass');
const browserify = witch('browserify');

// jscs:disable maximumLineLength
module.exports = {
  'make-folders': `mkdir -p ${target}/js ${target}/css ${target}/images`,
  'compile-css': `${npmsass} ${source}/scss/app.scss > ${target}/css/app.css`,
  'bundle-js': `${browserify} ${source}/js/index.js > ${target}/js/bundle.js`,
  'copy-images': `cp -r ${source}/images ${target}`
};
