
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var escape = require('shell-escape');
var debug = require('debug')('gify');
var mkdirp = require('mkdirp');
var uid = require('uid2');

/**
 * Expose `gify()`.
 */

module.exports = gify;

/**
 * Convert `input` file to `output` gif with the given `opts`:
 *
 *  - `width` max width [500]
 *  - `height` max height [none]
 *  - `delay` between frames [0]
 *  - `rate` frame rate [10]
 *  - `start` start position in seconds [0]
 *  - `duration` length of video to convert [auto]
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

function gify(input, output, opts, fn) {
  if (!input) throw new Error('input filename required');
  if (!output) throw new Error('output filename required');

  // options
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  // dims
  var w = opts.width;
  var h = opts.height;
  var rate = opts.rate || 10;
  var delay = opts.delay || 'auto';

  // auto delay
  if ('auto' == delay) {
    delay = 1000 / rate / 10 | 0;
  }

  // scale
  var scale;
  if (w) scale = w + ':-1';
  else if (h) scale = '-1:' + h;
  else scale = '500:-1';

  // tmpfile(s)
  var id = uid(10);
  var dir = '/tmp/' + id;
  var tmp  = dir + '/%04d.png';

  function gc(err) {
    debug('remove %s', dir);
    exec('rm -fr ' + dir);
    fn(err);
  }

  debug('mkdir -p %s', dir);
  mkdirp(dir, function(err){
    if (err) return fn(err);
    
    // convert to gif
    var cmd = ['ffmpeg'];
    cmd.push('-i', input);
    cmd.push('-filter:v', 'scale=' + scale);
    cmd.push('-r', String(rate));
    if (opts.start) cmd.push('-ss', String(opts.start));
    if (opts.duration) cmd.push('-t', String(opts.duration));
    cmd.push(tmp);
    cmd = escape(cmd);

    debug('exec `%s`', cmd);
    exec(cmd, function(err){
      if (err) return gc(err);
      var cmd;

      cmd = ['gm', 'convert'];
      cmd.push('-delay', String(delay || 0));
      cmd.push('-loop', '0');
      cmd.push('/tmp/' + id + '/*.png');
      cmd.push(output);
      cmd = escape(cmd);

      debug('exec `%s`', cmd);
      exec(cmd, gc);
    });
  });
}