'use strict';

var proxyquire = require('proxyquireify')(require);
var $ = require('jquery');

var loadjQueryPluginStub = sinon.stub();

var inputElement = $('<input/>');
var inputValue = 'foo';
var source = {foo: 'bar', bar: 'baz'};
var list = ['one', 'two'];

var BloodhoundStubPrototype = {
  getSource: sinon.stub().returns(source),
  setInput: sinon.stub()
};

var BloodhoundStub = sinon.stub().returns(BloodhoundStubPrototype);

var InputStubPrototype = {
  getValue: sinon.stub().returns(inputValue),
  startTypeahead: sinon.stub(),
  getElement: sinon.stub().returns(inputElement)
};

var InputStub = sinon.stub().returns(InputStubPrototype);

var SelectStubPrototype = {
  append: sinon.stub(),
  removeElement: sinon.stub(),
  getList: sinon.stub().returns(list)
};

var SelectStub = sinon.stub().returns(SelectStubPrototype);

describe('typeahead', function() {

  before(function() {
    fixture.setBase('test/fixtures');
  });

  var typeahead = proxyquire('../../../src/js/typeahead/index.js', {
    'typeahead-aria': {
      loadjQueryPlugin: loadjQueryPluginStub
    },
    './bloodhound': BloodhoundStub,
    './input': InputStub,
    './select': SelectStub
  });

  it('calls loadjQueryPlugin', function() {
    loadjQueryPluginStub.should.have.been.called;
  });

  describe('module', function() {
    var selectElements;

    beforeEach(function() {
      this.html = fixture.load('selects.html');
      selectElements = $(this.html).find('.typeahead');
      typeahead(selectElements);
    });

    afterEach(function() {
      fixture.cleanup();
    });

    it('registers a new Bloodhound with each element', function() {
      BloodhoundStub
        .should.have.been.calledWith($(selectElements[0]));
      BloodhoundStub
        .should.have.been.calledWith($(selectElements[1]));
      BloodhoundStub
        .should.have.been.calledExactlyTwice;
    });

    it('registers a new Input with each element', function() {
      InputStub
        .should.have.been.calledWith($(selectElements[0]));
      InputStub
        .should.have.been.calledWith($(selectElements[1]));
      InputStub
        .should.have.been.calledExactlyTwice;
    });

    it('registers a new Select with each element', function() {
      SelectStub
        .should.have.been.calledExactlyTwice;
      SelectStub
        .should.have.been.calledWith($(selectElements[0]));
      SelectStub
        .should.have.been.calledWith($(selectElements[1]));
    });

    it('gets the source from bloodhound with the list', function() {
      BloodhoundStubPrototype.getSource
        .should.have.been.calledWith(list)
        .and.have.been.calledExactlyTwice;
    });

    it('appends the inputElement', function() {
      SelectStubPrototype.append
        .should.have.been.calledWith(inputElement)
        .and.have.been.calledExactlyTwice;
    });

    it('removes the selectElement', function() {
      SelectStubPrototype.removeElement
        .should.have.been.calledExactlyTwice;
    });

    it('sets the input value', function() {
      BloodhoundStubPrototype.setInput
        .should.have.been.calledWith(inputValue)
        .and.should.have.been.calledExactlyTwice;
    });

    it('starts the typeahead with source data', function() {
      InputStubPrototype.startTypeahead
        .should.have.been.calledWith(source)
        .and.should.have.been.calledExactlyTwice;
    });

  });

});
