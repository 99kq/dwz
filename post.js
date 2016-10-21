var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var csv = require('node-csv');

function baiduDwz(codestring) {

  var post_data = querystring.stringify({
    'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
    'output_format': 'json',
    'output_info': 'compiled_code',
    'warning_level' : 'QUIET',
    'url' : codestring,
    'content-length': '180'
  });

  var options = {
    host: 'dwz.cn',
    port: 80,
    path: '/create.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  };

  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var request = eval("(" + chunk + ")");
      console.log(codestring  + ',' + request.tinyurl);
    });
  });
  // write data to request body
  req.write(post_data + "\n");
  req.end();

}

// console.log(csv);

csv.createParser().parseFile('./link2.csv', function(err, data) {
    if (err) throw err;
    for (var name in data) {
      // console.log( data[name]);
      baiduDwz(data[name]);
    }
});



// var data = 'https://www.99bill.com/seashell/html/activity/161024_double11/default.html?datasrc=appstartuppage';

// PostCode(data);