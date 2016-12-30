// Karma configuration
// Generated on Thu Dec 08 2016 16:22:31 GMT+0000 (GMT)

var proxyquire = require('proxyquireify');
var istanbul = require('browserify-istanbul');

module.exports = function(config) {
  config.set({

    basePath: './',

    frameworks: [
      'browserify',
      'mocha',
      'chai',
      'sinon-chai',
      'sinon',
      'fixture'
    ],

    browserify: {
      debug: true,
      plugin: [proxyquire.plugin],
      transform: [
        [
          istanbul({
            ignore: ['node_modules/**', 'test/**'],
            includeUntested: false,
            defaultIgnore: true
          }),
          {
            global: true
          }
        ]
      ]
    },

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/common.js',
      'test/browser/typeahead/*.js',
      'test/browser/index.js',
      {
        pattern: 'test/fixtures/*.html'
      }
    ],

    coverageReporter: {
      dir: 'coverage/',
      subdir: 'src/'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/fixtures/*.html': ['html2js'],

      'test/browser/typeahead/*.js': ['browserify'],
      'test/browser/index.js': ['browserify'],
      'test/common.js': ['browserify'],

      'src/js/typeahead/helpers.js': ['browserify'],
      'src/js/typeahead/input.js': ['browserify'],
      'src/js/typeahead/select.js': ['browserify'],
      'src/js/typeahead/bloodhound.js': ['browserify'],
      'src/js/typeahead/index.js': ['browserify'],
      'src/js/index.js': ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 3
  });
};
