'use strict';

module.exports = {
  sorter: function sorter(input) {
    return function sort(a, b) {
      var startsWithInput = function startsWithInput(x) {
        return x.toLowerCase().substr(0, input.length) === input.toLowerCase() ? -1 : 1;
      };

      var compareAlpha = function compareAlpha(x, y) {
        var less = x < y ? -1 : 1;
        return x === y ? 0 : less;
      };

      var compareStartsWithInput = function compareStartsWithInput(x, y) {
        var startsWithFirst = startsWithInput(x);
        var startsWithSecond = startsWithInput(y);
        return startsWithFirst === startsWithSecond ? 0 : startsWithFirst;
      };

      var first = compareStartsWithInput(a, b);

      return first === 0 ? compareAlpha(a, b) : first;
    };
  }
};
