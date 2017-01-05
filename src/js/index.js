'use strict';

var toolkit = require('hof-frontend-toolkit');
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;
var typeahead = require('./typeahead');

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);

module.exports = function(options) {
  typeahead(options);
};
