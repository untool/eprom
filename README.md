# eprom

[![travis](https://img.shields.io/travis/untool/eprom/master.svg)](https://travis-ci.org/untool/eprom)&nbsp;[![npm](https://img.shields.io/npm/v/eprom.svg)](https://www.npmjs.com/package/eprom) <br/>

`eprom` is an **e**nhanced **prom**ise implementation. It works by wrapping a globally available [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) class and is as compliant with the [Promises/A+](https://promisesaplus.com) spec as the global `Promise` is.

In addition to the usual `then`, `call` and `finally` instance methods, it provides `resolve` and `reject` methods. In this regard, it resembles jQuery's [`Deferred`](https://api.jquery.com/category/deferred-object/) object. On top of that, it features a `reset` method that enables repeat fulfillment.

### Installation

Using [NPM](https://www.npmjs.com/get-npm):

```text
npm install -S eprom
```

Using [Yarn](https://yarnpkg.com/en/):

```text
yarn add eprom
```

### API

`eprom` mimics more usual [`Promises`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) in every way. As such, it provides all class ([`resolve`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve), [`reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject), [`all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), [`race`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)) and instance ([`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then), [`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch), [`finally`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)) methods these provide.

#### `eprom.resolve(value)`

This method resolves an `eprom`'s inner `Promise`, triggering the execution of all `onFulfilled` handlers.

```javascript
const eprom = new Eprom();
eprom.then(value => console.log(value));
eprom.resolve('foo');
// logs 'foo'
```

#### `eprom.reject(reason)`

This method rejects an `eprom`'s inner `Promise`, triggering the execution of all `onRejected` handlers.

```javascript
const eprom = new Eprom();
eprom.catch(reason => console.err(reason));
eprom.reject('bar');
// logs 'bar'
```

#### `eprom.reset()`

This method creates a fresh inner `Promise` and thus allows for the re-fulfillment of an `eprom`. A typical use case for this is handling repeat builds triggered by [Webpack](https://webpack.js.org) in [watch mode](https://webpack.js.org/configuration/watch/).

```javascript
const eprom = new Eprom();
eprom.resolve('foo');
eprom.reset();
eprom.then(value => console.log(value));
eprom.resolve('bar');
// logs 'bar'
```
