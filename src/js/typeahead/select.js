'use strict';

var Select = function Select($element) {
  this.$element = $element;
  this.$parent = this.$element.parent();
};

Select.prototype.removeElement = function removeElement() {
  this.$element.remove();
};

Select.prototype.append = function append(element) {
  this.$parent.append(element);
};

Select.prototype.getList = function getList() {
  return this.$element.find('option').map(function mapOptions() {
    return this.value !== '' ? this.value : undefined;
  }).get();
};

module.exports = Select;
