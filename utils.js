function isObject (x) {
  return typeof x === 'object' &&
    !Array.isArray(x) &&
    x !== null
}

module.exports = {
  isObject
}
