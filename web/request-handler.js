var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var Q = require('Q');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method === 'GET' ) {
    if ( pathname.slice(0, 8) === '/archive' ) {
      var resource = pathname.slice(9);
      helpers.fileExists(resource, archive.paths.archivedSites, function(exists){
        if (exists) {
          helpers.serveAssets(res, resource, archive.paths.archivedSites);
        } else {
          archive.addUrlToList(resource);
          helpers.threeOhOne(res, '/loading.html');
        }
      });
    } else if ( pathname === '/') {
      helpers.serveAssets(res, 'index.html', archive.paths.siteAssets);
    } else {
      var resource = pathname.slice(1);
      helpers.fileExists(resource, archive.paths.siteAssets, function(exists){
        if (exists) {
          helpers.serveAssets(res, resource, archive.paths.siteAssets);
        } else {
          helpers.fourOhFour(res);
        }
      });
    }
  } else if ( req.method === 'POST' ) {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      body = body.slice(4);
      helpers.threeOhOne(res, '/archive/' + body );
    });
  }
  else {
    helpers.fourOhFour(res);
  }
};


