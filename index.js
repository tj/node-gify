
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var escape = require('shell-escape');
var debug = require('debug')('gify');
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

  // scale
  var scale;
  if (w) scale = w + ':-1';
  else if (h) scale = '-1:' + h;
  else scale = '500:-1';

  // tmpfile(s)
  var id = uid(10);
  var tmp  = '/tmp/' + id + '%04d.png';
  debug('options %j', opts);

  // convert to gif
  var cmd = ['ffmpeg'];
  cmd.push('-i', input);
  !opts.hq && cmd.push('-pix_fmt', 'rgb24');
  cmd.push('-filter:v', 'scale=' + scale);
  opts.hq && cmd.push('-r', '10');
  cmd.push(tmp);
  cmd = escape(cmd);

  debug('exec `%s`', cmd);
  exec(cmd, function(err){
    if (err) return fn(err);
    var cmd;

    cmd = ['convert'];
    cmd.push('-delay', String(opts.delay || 0));
    cmd.push('-loop', '0');
    cmd.push('/tmp/' + id + '*.png');
    cmd.push(output);
    cmd = escape(cmd);

    debug('exec `%s`', cmd);
    exec(cmd, fn);
  });
}