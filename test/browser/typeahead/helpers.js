'use strict';

var helpers = require('../../../src/js/typeahead/helpers');

describe('helpers', function() {

  describe('.sorter', function() {

    var sorted;
    var input = 'foobar';

    beforeEach(function() {
      sorted = helpers.sorter(input);
    });

    it('sorts alphabetically', function() {
      sorted('a', 'b').should.equal(-1);
      sorted('b', 'a').should.equal(1);
      sorted('b', 'b').should.equal(0);
    });

    it('sorts numerically', function() {
      sorted('4', '5').should.equal(-1);
      sorted('7', '4').should.equal(1);
      sorted('9', '9').should.equal(0);
    });

    it('sorts numbers in front of letters', function() {
      sorted('a', '5').should.equal(1);
      sorted('7', 'c').should.equal(-1);
    });

    it('sorts matches to the front', function() {
      sorted('foobar', 'foobaz').should.equal(-1);
      sorted('foobaz', 'foobar').should.equal(1);
      sorted('foobar', 'foobar').should.equal(0);
    });

  });

});
