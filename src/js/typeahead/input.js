'use strict';

var $ = require('jquery');

var applyAttributes = function applyAttributes($element, attributes) {
  $.each(attributes, function eachAttribute(i, item) {
    $element.attr(item.name, item.value);
  });
};

var setFormControl = function setFormControl($element) {
  $element.addClass('form-control');
};

var setValue = function setValue($element, $selectEl) {
  $element.val($selectEl.val());
};

var Input = function Input($selectEl) {
  this.$element = $('<input/>');
  var attributes = $selectEl.prop('attributes');
  applyAttributes(this.$element, attributes);
  setFormControl(this.$element);
  setValue(this.$element, $selectEl);
};

Input.prototype.getValue = function getValue() {
  return this.$element.val();
};

Input.prototype.getElement = function getElement() {
  return this.$element;
};

Input.prototype.startTypeahead = function startTypeahead(source) {
  this.$element.typeahead({
    hint: false
  }, {
    source: source
  });
};

module.exports = Input;
