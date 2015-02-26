var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');
var _ = require('underscore');

var htmlFetcher = {
  workingList: [],
  init: function() {
    archive.readListOfUrls(function(list){
      list = list.slice(0, -1);
      this.workingList = list;
      this.writeToFile('', archive.paths.list);
      if (list.length > 0) {
        this.parseUrls();
      }
    }.bind(this));
  },
  fetch: function(host, path, url){
    var resource = "";
    var options = {
      hostname: host,
      path: path,
      headers: {
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        Accept: 'image/webp,*/*;q=0.8',
        'User-Agent': 'Teapot',
        'Accept-Language': 'en-US,en;q=0.8'
      }
    };
    var req = http.request(options, function(res) {
      res.on('data', function(chunk) {
        resource+= chunk;
      });
      res.on('end', function(){
        this.writeToFile(resource, archive.paths.archivedSites + '/' + url);
      }.bind(this));
    }.bind(this));
    req.on('error', function(error) {
      console.log(error);
    });
    req.end();
  },
  parseUrls: function() {
    _.each(this.workingList, function(url) {
      var decoded = decodeURIComponent(url);
      console.log('decoded', decoded);
      var splitIndex = decoded.indexOf('/');
      if (splitIndex > -1) {
        host = decoded.slice(0,splitIndex);
        path = decoded.slice(splitIndex);
      } else {
        host = decoded;
        path = '/';
      }
      console.log('host', host, 'path', path)
      this.fetch(host, path, url);
    }, this);
  },
  writeToFile: function(string, filepath) {
    fs.writeFile(filepath, string);
  }
};

htmlFetcher.init();
