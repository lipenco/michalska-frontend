"use strict";
var api = angular.module('kingaApi');


api.service('Flicker', function(http, $http) {
  var Flicker = {};

  Flicker.getPhotosFromPhotoset = function(project_id) {
    return http.get('flickr/' + project_id);
  };

  return Flicker;
});
