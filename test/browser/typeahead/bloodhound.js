'use strict';

var proxyquire = require('proxyquireify')(require);
var $ = require('jquery');

var TypeaheadBloodhoundStub = sinon.stub();
TypeaheadBloodhoundStub.tokenizers = {
  whitespace: {}
};

var Bloodhound = proxyquire('../../../src/js/typeahead/bloodhound.js', {
  'typeahead-aria': {
    Bloodhound: TypeaheadBloodhoundStub
  },
  './helpers': {
    sorter: sinon.stub()
  }
});

describe('Bloodhound', function() {

  var selectElement;
  var bloodhound;

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.html = fixture.load('select.html');
    selectElement = $(this.html).find('.typeahead');
    bloodhound = new Bloodhound(selectElement);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  it('.getSource() returns a new instance', function() {
    bloodhound.getSource().should.be.an.instanceof(TypeaheadBloodhoundStub);
  });

  it('.getSource() creates a new TypeaheadBloodhound with data and the list argument', function() {
    var list = [1, 2, 3];
    var data = bloodhound.getData(list);
    bloodhound.getSource(list);
    TypeaheadBloodhoundStub.should.have.been.calledWith(data);
  });

  it('.setInput() assigns the val argument to the input', function() {
    var val = 'foo';
    should.not.exist(bloodhound.input);
    bloodhound.setInput(val);
    bloodhound.input.should.equal(val);
  });

});
