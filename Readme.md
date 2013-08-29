
# gify

  Turn videos into gifs.

  **Default**

  ![](http://i.cloudup.com/0TPHizFRLL.gif)

  **High Quality**

  ![](http://i.cloudup.com/0lDQXlLZNS.gif)
## Installation

```
$ npm install gify
```

  Also requires `ffmpeg` and `gifsicle` or `imagemagick` for higher quality.

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
  width: 300,
  hq: true
};

gify('out.mp4', 'out.gif', opts, function(err){
  if (err) throw err;
});
```

## Options

 - `width` max width [500]
 - `height` max height [none]
 - `delay` between frames [0]
 - `hq` higher quality [false]

# License

  MIT