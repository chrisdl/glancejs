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

test('doesnt mess up a deepish object', () => {
  const obj = {
    a: {
      b: {
        c: [
          {
            d: [1]
          },
          {
            e: [
              {
                f: 'f'
              }
            ]
          }
        ]
      }
    }
  }
  const expected = JSON.parse(JSON.stringify(obj))
  expect(glance({ obj, depth: 10 })).toEqual(expected)
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
  const arr = [['x'], ['y']]
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

test('Will not inspect a date object', () => {
  const date = new Date()

  // Simply returns the date object in this case
  expect(glance({ obj: date })).toEqual(date)
})

// This is a bit of a judgement call, should it return
// or should it complain? or both?
test('Returns non array/object values if they are passed', () => {
  expect(glance({ obj: 1 })).toBe(1)
  expect(glance({ obj: 'hello' })).toBe('hello')
  expect(glance({ obj: undefined })).toBe(undefined)
  expect(glance({ obj: true })).toBe(true)
  expect(glance({ obj: null })).toBe(null)
})

test('Can cut off arrays', () => {
  const obj = {
    arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
  expect(glance({ obj, arrayMax: 2 })).toEqual({
    arr: [0, 1, '8 more...']
  })
})
