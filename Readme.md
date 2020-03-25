# gify

  Turn videos into gifs.

  ![](http://i.cloudup.com/0lDQXlLZNS.gif)

## Installation

```
$ npm install gify
```

Requires `ffmpeg` and `graphicsmagick`:

```
brew install ffmpeg graphicsmagick
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
 - `delay` between frames [auto]
 - `rate` frame rate [10]
 - `start` start position in seconds or hh:mm:ss[.xxx] [0]
 - `duration` length of video to convert in seconds or hh:mm:ss[.xxx] [auto]
 - `transpose` rotation of video default [transpose=0]
 ``` 
  The possible values ​​to `transpose` are:
    0=90CounterCLockwise and Vertical Flip(default)
    1=90Clockwise
    2=90CounterClockwise
    3=90Clockwise and Vertical Flip
```

# License

  MIT
