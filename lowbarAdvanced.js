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

module.exports = _; 