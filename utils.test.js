/* global test, expect */

const utils = require('./utils')

const { isObject } = utils

test('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject({ a: 5 })).toBe(true)

  expect(isObject([])).toBe(false)
  expect(isObject('')).toBe(false)
  expect(isObject(null)).toBe(false)
})

test('isObject: Date', () => {
  // Inspecting dates is something I don't foresee
  // people needing. If you do let me know in a github issue
  // I would love to hear your usecase.
  expect(isObject(new Date())).toBe(false)
})
