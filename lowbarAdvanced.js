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

_.sortBy = function (list, func, context) {
  if (context) func = func.bind(context);
  if (typeof func === 'function') {
    return list.sort((a, b) => func(a) - func(b));
  }
  return list.sort((a, b) => a[func] - b[func]);
};

_.zip = function () {
  const args = [].slice.call(arguments)
    .sort((a, b) => b.length - a.length);
  return __.map(Object.keys(args[0]), (i) => {
    return __.map(args, (arr) => arr[i]);
  });
};

_.sortedIndex = (list, value, iteratee, context) => {
  if (!iteratee) iteratee = __.identity;
  else value = iteratee(value);
  if (context) iteratee.bind(context);
  if (!Array.isArray(list)) 0;

  let low = 0,
    high = list.length;

  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (iteratee(list[mid]) < value) low = mid + 1;
    else high = mid;
  }
  return low;
};

module.exports = _; 