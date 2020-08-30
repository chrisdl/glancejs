'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isObject (x) {
  return typeof x === 'object' &&
    !Array.isArray(x) &&
    x !== null &&
    !(x instanceof Date)
}

function digIntoArray ({ arr, depth, currentDepth, arrayMax, ...rest }) {
  if (Number.isInteger(arrayMax) && arrayMax >= 0) {
    const len = arr.length;
    arr = arr.slice(0, arrayMax);
    arr.push(`${len - arrayMax} more...`);
  }

  const output = arr.map((each) => {
    if (isObject(each)) {
      if (depth > currentDepth) {
        return digIntoObject({
          obj: each,
          depth,
          currentDepth: currentDepth + 1,
          arrayMax,
          ...rest
        })
      }
    } else if (Array.isArray(each)) {
      if (depth > currentDepth) {
        return digIntoArray({
          arr: each,
          depth,
          currentDepth: currentDepth + 1,
          arrayMax,
          ...rest
        })
      } else {
        return '[...]'
      }
    }
    return each
  });
  return output
}

function digIntoObject ({ obj, depth, currentDepth, ...rest }) {
  const output = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (isObject(value)) {
      if (depth > currentDepth) {
        acc[key] = digIntoObject({
          obj: value,
          depth,
          currentDepth: currentDepth + 1,
          ...rest
        });
      } else {
        acc[key] = '{...}';
      }
    } else if (Array.isArray(value)) {
      acc[key] = digIntoArray({
        arr: value,
        depth,
        currentDepth: currentDepth + 1,
        ...rest
      });
    } else {
      acc[key] = value;
    }

    return acc
  }, {});
  return output
}

function glance ({ obj, arrayMax, depth = 1 }) {
  if (Array.isArray(obj)) {
    return digIntoArray({ arr: obj, depth, arrayMax, currentDepth: 0 })
  }
  if (isObject(obj)) {
    return digIntoObject({ obj, depth, arrayMax, currentDepth: 0 })
  }
  return obj
}

exports.glance = glance;
