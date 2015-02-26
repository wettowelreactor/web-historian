var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);

  // if it's a get request to the root directory
    // assign the last portino of the uri before the query string to var "asset"
    // call helper method passing asset
  var pathname = url.parse(req.url).pathname;
  if (req.method === 'GET' && pathname.slice(8) === '/archive') {
    archive.
  } else if (req.method === 'GET') {
    //handle static req
  } else {
    //404
  }
};
