'use strict';

var proxyquire = require('proxyquireify')(require);
var $ = require('jquery');

var inputElement = $('<input/>');
var inputValue = 'foo';

var InputStubPrototype = {
  getValue: sinon.stub().returns(inputValue),
  startTypeahead: sinon.stub(),
  getElement: sinon.stub().returns(inputElement)
};
var InputStub = sinon.stub().returns(InputStubPrototype);

var Select = proxyquire('../../../src/js/typeahead/select.js', {
  './input': InputStub
});

describe('select', function() {
  var selectElement;
  var select;

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.html = fixture.load('select.html');
    selectElement = $(this.html).find('.typeahead');
    select = new Select(selectElement);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  it('saves its parent element', function() {
    select.$parent.html().should.equal($(selectElement).parent().html());
  });

  it('.removeElement() removes the select element from the DOM', function() {
    select.$parent.find(select.$element).length.should.equal(1);
    select.removeElement();
    select.$parent.find(select.$element).length.should.equal(0);
  });

  it('.append() adds the element argument to the parent element', function() {
    var element = $('<input/>');

    select.$parent.find(element).length.should.equal(0);
    select.append(element);
    select.$parent.find(element).length.should.equal(1);
  });

  it('.getList() returns the option values as a list', function() {
    var list = select.$element.find('option').map(function mapOptions() {
      return this.value !== '' ? this.value : undefined;
    }).get();

    select.getList().should.deep.equal(list);
  });

});
