const _ = {};

_.identity = (val) => {
  return val;
};

_.first = (arr, n) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return undefined;
  } else if (n === undefined) {
    return arr[0];
  } else {
    return arr.slice(0, Math.floor(n));
  }
};

_.last = (arr, n) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  if (n !== undefined && isNaN(n)) return [];
  if (n === undefined) n = 1;

  const end = arr.slice(arr.length - Math.ceil(n), arr.length);
  return end.length === 1 ? end[0] : end;
};

_.each = (list, func, context) => {
  if (context) func.bind(context);
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      func(list[i], i, list);
    }
  } else {
    for (let key in list) {
      func(list[key], key, list);
    }
  }
  return list;
};

module.exports = _;