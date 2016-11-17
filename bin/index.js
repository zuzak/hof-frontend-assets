#!/usr/bin/env node

'use strict';

const exec = require('child_process').exec;
const caller = process.cwd();
const path = require('path');
const cwd = path.resolve(__dirname, '../');

exec(`mkdir -p ${caller}/public/js ${caller}/public/css ${caller}/public/images`, (err) => {
  if (err) {
    console.error(`Error making asset directories: ${err}`);
    return;
  }
  exec(`${caller}/node_modules/.bin/node-sass ${cwd}/scss/app.scss ${caller}/public/css/app.css --include-path ./node_modules`, (err) => {
    if (err) {
      console.error(`Error compiling CSS: ${err}`);
      return;
      console.info('Compiled CSS with node-sass');
    }
  });
  exec(`browserify ${cwd}/js/index.js > ${caller}/public/js/bundle.js`, (err) => {
    if (err) {
      console.error(`Error compiling JS: ${err}`);
      return;
      console.info('Compiled JS with Browserify');
    }
  });
  exec(`cp -r ${cwd}/images ${caller}/public`, (err) => {
    if (err) {
      console.error(`Error copying images: ${err}`);
      return;
    }
    console.info('Copied images');
  });
});
