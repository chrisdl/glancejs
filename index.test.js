/* global test, expect */

const glance = require('./index')

test('exists', () => {
  expect(glance).toBeDefined()
})

test('accepts an object', () => {
  const obj = { hello: 'world' }
  expect(glance({ obj })).toEqual(obj)
})

test('cuts off depth 0 object', () => {
  const obj = {
    a: {
      b: 'hello'
    }
  }
  const expected = { a: '{...}' }
  expect(glance({ obj, depth: 0 })).toEqual(expected)
})

test('Keep entire 1 depth obj.', () => {
  const obj = {
    a: {
      b: 'hello'
    }
  }
  const expected = {
    a: {
      b: 'hello'
    }
  }
  expect(glance({ obj, depth: 1 })).toEqual(expected)
})

test('cuts off depth 1 object', () => {
  const obj = {
    a: {
      b: {
        c: 'hello'
      }
    }
  }
  const expected = {
    a: {
      b: '{...}'
    }
  }
  expect(glance({ obj, depth: 1 })).toEqual(expected)
})

test('keeps entire 2 depth obj', () => {
  const obj = {
    a: {
      b: 'hello',
      c: {
        d: 'woof'
      }
    }
  }
  const expected = {
    a: {
      b: 'hello',
      c: {
        d: 'woof'
      }
    }
  }
  expect(glance({ obj, depth: 2 })).toEqual(expected)
})

test('works for array of objects', () => {
  const obj = [{
    a: {
      b: 'hello',
      c: {
        d: 'woof'
      }
    }
  }]
  const expected = [{
    a: {
      b: 'hello',
      // making it an array means one more level of depth. thats why 'c'
      // gets cut off.
      c: '{...}'
    }
  }]
  expect(glance({ obj, depth: 2 })).toEqual(expected)
})

test('works for 1-dim array', () => {
  const arr = [1, 2, 3]
  const arrCopy = JSON.parse(JSON.stringify(arr))
  expect(glance({ obj: arr })).toEqual(arrCopy)
})

test('works for 2-dim array', () => {
  const arr = [ ['x'], ['y'] ]
  const arrCopy = JSON.parse(JSON.stringify(arr))
  expect(glance({ obj: arr })).toEqual(arrCopy)
})

test('works for 3 and 4-dim array', () => {
  const arr = [
    [
      [
        [4]
      ]
    ],
    [
      [3]
    ]
  ]
  const arrCopy = JSON.parse(JSON.stringify(arr))
  const output = glance({ obj: arr, depth: 3 })
  expect(output).toEqual(arrCopy)
})

test('works for 3 and 4-dim array (cutoff the 4)', () => {
  const arr = [
    [
      [
        [4]
      ]
    ],
    [
      [3]
    ]
  ]
  const output = glance({ obj: arr, depth: 2 })
  expect(output).toEqual([
    [
      [
        '[...]'
      ]
    ],
    [
      [3]
    ]
  ])
})
