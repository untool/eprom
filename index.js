'use strict';

function Eprom(executor) {
  var resolve = function() {};
  var reject = function() {};

  this.reset = function(executor) {
    var onFulfilled = resolve;
    var onRejected = reject;
    this.promise = new Promise(
      function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
        if (executor) {
          executor(this.resolve, this.reject, this.reset);
        }
      }.bind(this)
    );
    this.promise.then(onFulfilled, onRejected);
  }.bind(this);

  this.resolve = function(value) {
    return resolve(value);
  };
  this.reject = function(reason) {
    return reject(reason);
  };

  this.then = function(onFulfilled, onRejected) {
    return this.promise.then(onFulfilled, onRejected);
  };
  this.catch = function(onRejected) {
    return this.promise.catch(onRejected);
  };
  this.finally = function(onFinally) {
    return this.promise.finally(onFinally);
  };

  this.reset(executor);
}

Eprom.resolve = function(value) {
  return new Eprom(function(resolve) {
    resolve(value);
  });
};

Eprom.reject = function(reason) {
  return new Eprom(function(resolve, reject) {
    reject(reason);
  });
};

Eprom.deferred = function() {
  return new Eprom();
};

Eprom.all = function() {
  return Promise.all.apply(Promise, arguments);
};
Eprom.race = function() {
  return Promise.race.apply(Promise, arguments);
};

module.exports = Eprom;
