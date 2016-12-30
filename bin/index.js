#!/usr/bin/env node

const exec = require('child_process').exec;
const tasks = require('./tasks');

exec(tasks['make-folders'], (err) => {
  if (err) {
    return console.error(`Error making folders ${err}`);
  }
  console.log('Made folders');

  exec(tasks['compile-css'], (err) => {
    if (err) {
      return console.error(`Error compiling CSS: ${err}`);
    }
    console.info('Compiled CSS with node-sass');
  });
  exec(tasks['bundle-js'], (err) => {
    if (err) {
      return console.error(`Error compiling JS: ${err}`);
    }
    console.info('Compiled JS with Browserify');
  });
  exec(tasks['copy-images'], (err) => {
    if (err) {
      return console.error(`Error copying images: ${err}`);
    }
    console.info('Copied images');
  });
});
