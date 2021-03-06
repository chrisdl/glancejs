function isObject (x) {
  return typeof x === 'object' &&
    !Array.isArray(x) &&
    x !== null &&
    !(x instanceof Date)
}

export { isObject }
