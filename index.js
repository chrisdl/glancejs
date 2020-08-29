const { isObject } = require('./utils')

function digIntoArray ({ arr, depth, currentDepth }) {
  // console.log({
  //   arrAsString: JSON.stringify(arr),
  //   depth,
  //   currentDepth
  // })
  const output = arr.map((each) => {
    if (isObject(each)) {
      if (depth > currentDepth) {
        return digIntoObject({
          obj: each,
          depth,
          currentDepth: currentDepth + 1
        })
      }
    } else if (Array.isArray(each)) {
      if (depth > currentDepth) {
        return digIntoArray({
          arr: each,
          depth,
          currentDepth: currentDepth + 1
        })
      } else {
        return '[...]'
      }
    }
    return each
  })
  return output
}

function digIntoObject ({ obj, depth, currentDepth }) {
  // console.log({ objAsString: JSON.stringify(obj), depth, currentDepth })

  const output = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]

    if (isObject(value)) {
      if (depth > currentDepth) {
        acc[key] = digIntoObject({
          obj: value,
          depth,
          currentDepth: currentDepth + 1
        })
      } else {
        acc[key] = '{...}'
      }
    } else if (Array.isArray(value)) {
      acc[key] = digIntoArray({
        arr: value,
        depth,
        currentDepth: currentDepth + 1,
        ...rest
      })
    } else {
      acc[key] = value
    }

    return acc
  }, {})
  // console.log({ depth, output })
  return output
}

module.exports = function ({ obj, depth = 1 }) {
  if (Array.isArray(obj)) {
    return digIntoArray({ arr: obj, depth, currentDepth: 0 })
  }
  return digIntoObject({ obj, depth, currentDepth: 0 })
}
