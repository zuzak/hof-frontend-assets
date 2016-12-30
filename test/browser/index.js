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

proxyquire('../../src/js/index.js', {
  'hof-frontend-toolkit': toolkitStub,
  './typeahead': typeaheadStub
});

describe('index', function() {
  it('calls typeahead with elements', function() {
    typeaheadStub.should.have.been.calledOnce;
  });
});
