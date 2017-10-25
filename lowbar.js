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

_.reject = (list, predicate, context) => {
  const result = [];
  _.each(list, (value, index, obj) => {
    if (!predicate(value, index, obj)) result.push(value);
  }, context);
  return result;
};

_.uniq = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (_.indexOf(result, arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
};

_.map = (list, iteritee, context) => {
  const result = [];
  if (typeof iteritee !== 'function') {
    iteritee = () => undefined;
  }
  _.each(list, (value, index, arr) => {
    result.push(iteritee(value, index, arr));
  }, context);
  return result;
};

_.contains = (list, value, fromIndex) => {
  if (!Array.isArray(list)) {
    list = Object.values(list);
  }
  if (Number.isInteger(fromIndex)) {
    list = list.splice(fromIndex, list.length);
  }
  if (_.indexOf(list, value) !== -1) return true;
  return false;
};

_.pluck = (list, propertyName) => {
  return _.map(list, (obj) => {
    return obj[propertyName];
  });
};

module.exports = _;