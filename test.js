var test = require('ava');

var Eprom = require('./index');

test('exports test', function(t) {
  t.is(typeof Eprom, 'function', 'Eprom is a function');
});

test('resolve test', function(t) {
  var eprom = new Eprom();
  eprom.resolve('foo');
  return eprom.then(function(value) {
    t.is(value, 'foo', 'external resolving works');
  });
});

test('reject test', function(t) {
  var eprom = new Eprom();
  eprom.reject('foo');
  return eprom.catch(function(value) {
    t.is(value, 'foo', 'external rejecting works');
  });
});

test('reset test', function(t) {
  var eprom = Eprom.resolve('foo');
  eprom.reset();
  eprom.resolve('bar');
  return eprom.then(function(value) {
    t.is(value, 'bar', 'external resetting works');
  });
});
