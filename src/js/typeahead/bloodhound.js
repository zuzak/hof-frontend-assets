'use strict';

var TypeaheadBloodhound = require('typeahead-aria').Bloodhound;
var sorter = require('./helpers').sorter;

var Bloodhound = function Bloodhound($selectEl) {
  this.$selectEl = $selectEl;
};

Bloodhound.prototype.getData = function getData(list) {
  return {
    datumTokenizer: TypeaheadBloodhound.tokenizers.whitespace,
    queryTokenizer: TypeaheadBloodhound.tokenizers.whitespace,
    local: list,
    sorter: sorter(this.input),
    limit: 100
  };
};

Bloodhound.prototype.getSource = function getSource(list) {
  return new TypeaheadBloodhound(this.getData(list));
};

Bloodhound.prototype.setInput = function setInputElement(val) {
  this.input = val;
};

module.exports = Bloodhound;
