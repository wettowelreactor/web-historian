var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method === 'GET' && pathname.slice(0, 8) === '/archive') {
    var resource = pathname.slice(9);
    helpers.fileExists(resource, archive.paths.archivedSites, function(exists){
      if (exists) {
        helpers.serveAssets(res, resource, archive.paths.archivedSites);
      } else {
        archive.addUrlToList(resource);
        helpers.serveAssets(res, 'loading.html', archive.paths.siteAssets);
      }
    });
  } else if (req.method === 'GET' && pathname === '/') {
    helpers.serveAssets(res, 'index.html', archive.paths.siteAssets);
  } else if (req.method === 'GET') {
    var resource = pathname.slice(1);
    helpers.fileExists(resource, archive.paths.siteAssets, function(exists){
      if (exists) {
        helpers.serveAssets(res, resource, archive.paths.siteAssets);
      } else {
        helpers.fourOhFour(res);
      }
    });
  } else {
    helpers.fourOhFour(res);
  }
};


