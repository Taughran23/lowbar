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

module.exports = _;