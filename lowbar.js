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

_.indexOf = (arr, value, isSorted) => {
  isSorted = isSorted || false;
  if (isSorted) {
    let first = 0,
      last = arr.length - 1,
      mid;
    while (first <= last) {
      mid = Math.floor((first + last) / 2);
      if (arr[mid] < value) {
        first = mid + 1;
      } else if (arr[mid] > value) {
        last = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
};

_.filter = (list, predicate, context) => {
  const result = [];
  if (context) predicate.bind(context);
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i])) {
        result.push(list[i]);
      }
    }
  } else {
    for (let key in list) {
      if (predicate(list[key])) {
        result.push(list[key]);
      }
    }
  }
  return result;
};

module.exports = _;