'use strict';

const path = require('path');
const cwd = process.cwd();
const target = path.resolve(cwd, 'public');
const source = path.resolve(__dirname, '../src');
const sass = require('witch')('node-sass');

// jscs:disable maximumLineLength
module.exports = {
  'make-folders': `mkdir -p ${target}/js ${target}/css ${target}/images`,
  'compile-css': `${sass} ${source}/scss/app.scss ${target}/css/app.css --include-path ./node_modules`,
  'bundle-js': `browserify ${source}/js/index.js > ${target}/js/bundle.js`,
  'copy-images': `cp -r ${source}/images ${target}`
};
