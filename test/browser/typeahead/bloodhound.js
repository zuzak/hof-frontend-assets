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
  var list = [1, 2, 3];
  var options = {
    datumTokenizer: {foo: 'bar'},
    queryTokenizer: {bar: 'baz'},
    local: ['foo', 'bar'],
    sorter: function() {},
    limit: 200
  };

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.html = fixture.load('select.html');
    selectElement = $(this.html).find('.typeahead');
    bloodhound = new Bloodhound(selectElement, options);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  it('.getSettings(list) returns settings with the list argument', function() {
    bloodhound.getSettings(list).should.be.an.object;
    bloodhound.getSettings(list).local.should.deep.equal(list);
  });

  it('.getSettings(list, options) returns settings mixed with options', function() {
    bloodhound.getSettings(list, options).should.be.an('object')
      .and.deep.equal(options);
  });

  it('.getSettings(list, options) options list overrides list argument', function() {
    bloodhound.getSettings(list, options).local.should.deep.equal(options.local);
  });

  it('.getSource() returns a new instance of Typeahead Bloodhound', function() {
    var settings = bloodhound.getSettings(list);
    bloodhound.getSource(settings).should.be.an.instanceof(TypeaheadBloodhoundStub);
    TypeaheadBloodhoundStub.should.have.been.calledWith(settings);
  });

  it('.setInput() assigns the val argument to the input', function() {
    var val = 'foo';
    should.not.exist(bloodhound.input);
    bloodhound.setInput(val);
    bloodhound.input.should.equal(val);
  });

});
