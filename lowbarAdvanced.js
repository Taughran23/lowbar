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

module.exports = _; 