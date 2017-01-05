'use strict';

var proxyquire = require('proxyquireify')(require);
var $ = require('jquery');

var inputElement = $('<input/>');
var inputValue = 'foo';

var toolkitStub = {
  helpers: {
    documentReady: sinon.stub()
  },
  progressiveReveal: sinon.stub(),
  formFocus: sinon.stub()
};

var typeaheadStub = sinon.stub();

var typeahead = proxyquire('../../src/js/index.js', {
  'hof-frontend-toolkit': toolkitStub,
  './typeahead': typeaheadStub
});

describe('index', function() {
  it('exports the typeahead module', function() {
    typeahead();
    typeaheadStub.should.have.been.calledOnce;
  });

  it('export passes options argument to typeahead', function() {
    var options = 'options';
    typeahead(options);
    typeaheadStub.should.have.been.calledWith(options);
  });
});
