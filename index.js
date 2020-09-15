
/**
 * Module dependencies.
 */

var execFile = require('child_process').execFile;
var escape = require('shell-escape');
var debug = require('debug')('gify');
var mkdirp = require('mkdirp');
var uid = require('uid2');
var path = require('path');

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
  var dir = path.resolve('/tmp/' + id);
  var tmp  = path.join(dir, '/%04d.png');

  // escape paths
  input = escape([input]);
  output = escape([output]);
  // normalize
  if (process.platform === 'win32') {
    input = input.replace(/^'|'$/g, '"');
    output = output.replace(/^'|'$/g, '"');
  }

  function gc(err) {
    debug('remove %s', dir);
    execFile('rm', ['-fr ', dir]);
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
    cmd = cmd.join(' ');

    debug('exec `%s`', cmd);
    cmd = cmd.split(' ')
    execFile(cmd[0], cmd.splice(1), function(err){
      if (err) return gc(err);
      var cmd;
      var wildcard = path.join(dir, '/*.png');

      cmd = ['gm', 'convert'];
      cmd.push('-delay', String(delay || 0));
      cmd.push('-loop', '0');
      cmd.push(wildcard);
      cmd.push(output);
      cmd = cmd.join(' ');

      debug('exec `%s`', cmd);
      cmd = cmd.split(' ')
      execFile(cmd[0], cmd.splice(1), gc);
    });
  });
}
