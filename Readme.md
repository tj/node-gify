
# gify

  Turn videos into gifs.

  ![](https://dsz91cxz97a03.cloudfront.net/sz2TDQoRkz.gif)

## Installation

```
$ npm install gify
```

## Example

  Without options:

```js
gify('out.mp4', 'out.gif', function(err){
  if (err) throw err;
});
```

  With options:

```js
var opts = {
  width: 300
};

gify('out.mp4', 'out.gif', opts, function(err){
  if (err) throw err;
});
```

## Options

 - `width` max width [500]
 - `height` max height [none]
 - `delay` between frames [0]

# License

  MIT