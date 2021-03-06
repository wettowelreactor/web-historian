var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Q = require('Q');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var deferred = Q.defer();
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err) console.log(err);
    else {
      list = data.split('\n');
      deferred.resolve(list);
    }
  })
  return deferred.promise;
};

exports.isUrlInList = function(url){
  var deferred = Q.defer();
  exports.readListOfUrls().then(function(list){
    if ( list.indexOf(url) > -1 ) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }
  });
  return deferred.promise;
};

exports.addUrlToList = function(url){
  exports.isUrlInList(url)
    .then(function(exists){
      if ( !exists ) {
        fs.appendFile(exports.paths.list, url + '\n', function(err, data) {
          if (err) console.log(err);
          else console.log('succesful append to url list');
        });
      }
    });
};

exports.downloadUrls = function(){
};
