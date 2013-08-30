
# gify

  Turn videos into gifs.

  ![](http://i.cloudup.com/0lDQXlLZNS.gif)

## Installation

```
$ npm install gify
```

  Also requires `ffmpeg` and `graphicsmagic`.

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
 - `delay` between frames [auto]
 - `rate` frame rate [10]
 - `start` start position in seconds or hh:mm:ss[.xxx] [0]
 - `duration` length of video to convert in seconds or hh:mm:ss[.xxx] [auto]

# License

  MIT