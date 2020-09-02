# Glance

Glance is a NodeJS library for simplifying objects. It allows you to cut off arrays after a certain number and to cap objects after a certain depth is reached.

It has no dependencies and is only about 100 loc.

I use it for debugging big JSON responses mainly, but it's pretty general so there are definitely other usecases.

```javascript
// It can make this
{
  a: [ 1, 2, 3, 4, 5, ..., 500 ],
  b: {
    c: {
      d: {
        hello: 'world'
      }
    },
    e: [1,2,3]
  }
}

// Look like this
{
  a: [1,2,3, '497 more...'],
  b: {
    c: '{...}',
    e: '[...]'
  }
}
```

You control the depth and how much glance removes from arrays.

## Installation

```bash
npm install glance --save-dev
```

## Usage

### Node

```javascript

// Node 13+. I for one welcome our ESM overlords.
import { glance } from 'glance'

// Alt. if using CommonJS (CJS) modules
// const { glance } = require('glance')

const obj = {
  a: {
    b: {
      c: 'c'
    }
  }
};
console.log(glance(obj))

// You can also pass in an optional options object as a second parameter.
glance(obj, { depth: 2, arrayMax: 3 })
```

### Browser

Take a look at [browser.example.html](https://github.com/chrisdl/glancejs/blob/master/browser.example.html)

## Reference

The glance function takes an `object` or `array` as it‘s first parameter and then an optional options object as it‘s second parameter.

```javascript
glance(obj, {
  depth: 1                // Defaults to 1. How deep do you want to dig?
  arrayMax: undefined     // Not required. Max nr of items in arrays. Rest
                          // are sliced off. Adds a string to end of array
                          // telling you how many items were sliced off.
})
```

## Examples

All of the following are perfectly valid ways to call glance.

```javascript
glance({ a: 'a' })
glance([1, 2, 3])
glance([1, 2, 3], { arrayMax: 1 })
glance({ a: { b: { c: 'c' }}}, { depth: 0 })
glance({ a: [1, 2, 3] }, { depth: 4, arrayMax: 2 })
```

## Contributing

Anyone is welcome to contribute. Please open a github issue for bugs, improvements and new features.

If you are opening a PR please run `npx standard --fix` and make sure all the tests are passing before opening a PR.

## License

[ISC](https://github.com/chrisdl/glancejs/blob/master/LICENSE.txt)