
var gify = require('./');
var http = require('http');
var fs = require('fs');

//var url = 'http://dsz91cxz97a03.cloudfront.net/transcoded/UMBjbdrOiM.mp4';
//var file = fs.createWriteStream('out.mp4');
//
//http.get(url, function(res){
//  console.log(res.statusCode);
//  res.pipe(file);
//  res.on('end', function(){
//    console.log('done');
//  });
//});

var opts = {
  height: 300
};

console.time('convert');
gify('out.mp4', 'out.gif', opts, function(err){
  if (err) throw err;
  console.timeEnd('convert');
  var s = fs.statSync('out.gif');
  console.log('size: %smb', s.size / 1024 / 1024 | 0);
});
