/* eslint-env node, mocha */
var assert = require('assert');

var EnhancedPromise = require('.');

describe('EnhancedPromise', function() {
  it('is externally resolvable', function() {
    var enhancedPromise = new EnhancedPromise();
    enhancedPromise.resolve('foo');
    return enhancedPromise.then(function(value) {
      assert.equal(value, 'foo');
    });
  });
  it('is externally rejectable', function() {
    var enhancedPromise = new EnhancedPromise();
    enhancedPromise.reject('foo');
    return enhancedPromise.catch(function(value) {
      assert.equal(value, 'foo');
    });
  });
  it('is externally resettable', function() {
    var enhancedPromise = EnhancedPromise.resolve('foo');
    enhancedPromise.reset();
    enhancedPromise.resolve('bar');
    return enhancedPromise.then(function(value) {
      assert.equal(value, 'bar');
    });
  });
});

process.on('unhandledRejection', function() {});

describe('Promises/A+ Spec Compliance', function() {
  require('promises-aplus-tests').mocha(EnhancedPromise);
});
