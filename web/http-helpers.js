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

exports.serveAssets = function(res, asset, web, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var path;
  if (web) {
    path = archive.paths.siteAssets;
  } else {
    path = archive.paths.archivedSites;
  }

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
