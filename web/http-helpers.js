var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, path) {
  // readfile which will call
  fs.readFile(path + '/' + asset, 'utf8', function(err, data){
    if (err) {
      res.writeHead(500);
      res.end();
      console.log(err);
    }
    else {
      res.writeHead(200, exports.headers);
      res.write(data, function (){
        res.end();
      });
    }
  });
};

exports.fileExists = function(url, path, cb){
  fs.exists(path + '/' + url, function(exists) {
    return cb(exists);
  });
};

exports.fourOhFour = function(res) {
  res.writeHead(404);
  res.end();
};

exports.threeOhOne = function(res, path) {
  res.writeHead(301, { Location: path });
  res.end();
};

// As you progress, keep thinking about what helper functions you can put here!


// we get a request
  // let's check if it's for an endpoint after /archive/
    // if it is, call isUrlArchived
      // if it is, serve the asset
      // else, call addURL to List
        // 301
  // if it isn't run serveAssets with static flag
    //check if static asset exists
