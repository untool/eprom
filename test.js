/* eslint-env node, mocha */
var assert = require('assert');

var Eprom = require('.');

describe('Promises/A+ Spec Compliance', function() {
  require('promises-aplus-tests').mocha(Eprom);
});

describe('Eprom Promise Enhancements', function() {
  it('should be externally resolvable', function() {
    var eprom = new Eprom();
    eprom.resolve('foo');
    return eprom.then(function(value) {
      assert.equal(value, 'foo');
    });
  });
  it('should be externally rejectable', function() {
    var eprom = new Eprom();
    eprom.reject('foo');
    return eprom.catch(function(value) {
      assert.equal(value, 'foo');
    });
  });
  it('should be externally resettable', function() {
    var eprom = Eprom.resolve('foo');
    eprom.reset();
    eprom.resolve('bar');
    return eprom.then(function(value) {
      assert.equal(value, 'bar');
    });
  });
});
