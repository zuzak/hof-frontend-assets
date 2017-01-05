'use strict';

var TypeaheadBloodhound = require('typeahead-aria').Bloodhound;
var sorter = require('./helpers').sorter;
var _ = require('lodash');

var Bloodhound = function Bloodhound($selectEl) {
  this.$selectEl = $selectEl;
};

Bloodhound.prototype.getSettings = function getSettings(list, options) {
  var sorterFn = options ? options.sorter : sorter(this.input);
  return _.extend({}, {
    datumTokenizer: TypeaheadBloodhound.tokenizers.whitespace,
    queryTokenizer: TypeaheadBloodhound.tokenizers.whitespace,
    local: list,
    sorter: sorterFn,
    limit: 100,
  }, options);
};

Bloodhound.prototype.getSource = function getSource(data) {
  return new TypeaheadBloodhound(data);
};

Bloodhound.prototype.setInput = function setInputElement(val) {
  this.input = val;
};

module.exports = Bloodhound;
