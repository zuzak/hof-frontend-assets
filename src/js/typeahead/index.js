'use strict';

var $ = require('jquery');
var typeaheadAria = require('typeahead-aria');
typeaheadAria.loadjQueryPlugin();

var Select = require('./select');
var Input = require('./input');
var Bloodhound = require('./bloodhound');

module.exports = function(options) {
  $('.typeahead').each(function createSelect() {
    var $element = $(this);
    var select = new Select($element);
    var bloodhound = new Bloodhound($element);
    var input = new Input($element);

    var inputValue = input.getValue();
    var list = select.getList();
    bloodhound.setInput(inputValue);
    var data = bloodhound.getSettings(list, options);
    var source = bloodhound.getSource(data);
    var inputElement = input.getElement();

    select.append(inputElement);
    select.removeElement();
    input.startTypeahead(source);
  });
};
