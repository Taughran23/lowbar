const path = require('path');
const __ = require(path.join(__dirname, './lowbar.js'));

const _ = {};

_.once = (func) => {
  let called = false;
  return () => {
    if (!called) {
      called = true;
      return func.apply(null, arguments);
    }
  };
};

_.memoize = (func, hashFunc) => {
  const cache = {};
  const memo = function (key) {
    let args = hashFunc ? hashFunc.apply(null, arguments) : key;
    if (!cache[args]) cache[args] = func.apply(null, arguments);
    return cache[args];
  };
  memo.cache = cache;
  return memo;
};

_.shuffle = (list) => {
  if (!Array.isArray(list)) list = Object.values(list);
  const newList = list.slice(),
    result = [];
  let listLength = newList.length;
  for (let i = 0; i < newList.length; i++) {
    let randomIndex = Math.floor(Math.random() * listLength);
    result.push(newList[randomIndex]);
    listLength--;
  }
  return result;
};

_.invoke = function (list, method) {
  const args = [].slice.call(arguments, 2);

  const isFunc = typeof method === 'function';
  return __.map(list, function (value) {
    const fn = isFunc ? method : value[method];
    return fn == null ? fn : fn.apply(value, args);
  });
};

module.exports = _; 