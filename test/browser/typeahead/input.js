'use strict';

var $ = require('jquery');

var Input = require('../../../src/js/typeahead/input.js');

describe('Input', function() {
  var selectElement;
  var input;
  var selectValue = '0';

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.html = fixture.load('select.html');
    selectElement = $(this.html).find('.typeahead');
    selectElement.val(selectValue);
    input = new Input(selectElement);
    input.$element.typeahead = function() {};
    sinon.stub(input.$element, 'typeahead');
  });

  afterEach(function() {
    fixture.cleanup();
  });

  it('applies all attributes from the select element to the input', function() {
    input.$element.hasClass('typeahead').should.be.true;
    input.$element.attr('data-foo').should.equal('bar');
  });

  it('adds .form-control to the input', function() {
    input.$element.hasClass('form-control').should.be.true;
  });

  it('sets the value from the select element to the input', function() {
    input.getValue().should.equal(selectValue);
  });

  it('.getValue() returns the value of the input', function() {
    var value = 'foo';
    input.$element.val(value);

    input.getValue().should.equal(value);
  });

  it('.getElement() returns the value of the input', function() {
    input.getElement().should.equal(input.$element);
  });

  it('.startTypeahead(source) calls input.$element.typeahead with the source argument', function() {
    var source = {foo: 'bar'};
    input.startTypeahead(source);

    input.$element.typeahead.should.have.been.calledWith({
      hint: false
    }, {
      source: source
    })
    .and.should.have.been.calledExactlyTwice;
  });

});
