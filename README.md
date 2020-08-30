# Glance

Glance is a NodeJS library for simplifying objects. It allows you to cut off arrays after a certain number and to cap objects after a certain depth is reached.

I use it for debugging big JSON responses mainly, but it's pretty general so there are definitely other usecases.

```javascript
// It can make this:
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

You control the depth and how much it cuts off from arrays.

## Installation

```bash
npm install glance --save-dev
```

## Usage

Node

```javascript
// TODO
```

Browser

```javascript
// TODO
```

## Contributing

Anyone is welcome to contribute. Please open a github issue for bugs, improvements and new features.

If you are opening a PR please run `npx standard --fix` and make sure all the tests are passing before opening a PR.

## License

[ISC](https://github.com/chrisdl/glancejs/blob/master/LICENSE.txt)