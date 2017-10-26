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

_.flatten = (list) => {
  if (!Array.isArray(list)) return [];
  const result = [];

  __.each(list, element => {
    if (Array.isArray(element)) {
      result.push(..._.flatten(element));
    } else {
      result.push(element);
    }
  });
  return result;
};

_.intersection = function () {
  const args = [].slice.call(arguments);
  if(!Array.isArray(args[0])) return [];
  if(Array.isArray(args[0]) && args[0].length === 0) return [];

  return __.reduce(args[0], (acc, ele) => {
    let common = false;
    for (let i = 1; i < args.length; i++) {
      __.each(args[i], (element) => {
        if (ele === element) common = true;
      });
    }
    if (common) acc.push(ele);
    return acc;
  }, []);
};

_.difference = function(array){
  const others = [].slice.call(arguments, 1);
  return __.reduce(array, (acc, ele) => {
    let common = false;
    for (let i = 0; i < others.length; i++) {
      __.each(others[i], (element) => {
        if (ele === element) common = true;
      });
    }
    if (!common) acc.push(ele);
    return acc;
  },[]);
};

module.exports = _; 