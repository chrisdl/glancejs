/* global test, expect */

const utils = require('./utils')

const { isObject } = utils

test('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject({ a: 5 })).toBe(true)

  // What would happen if you wanted to glance at a Date object?
  // Why not allow it?
  expect(isObject(new Date())).toBe(true)

  expect(isObject([])).toBe(false)
  expect(isObject('')).toBe(false)
  expect(isObject(null)).toBe(false)
})
