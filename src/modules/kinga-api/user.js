"use strict";
var api = angular.module('kingaApi');

api.service('User', function(http) {
  var User = {};

  User.getToken = function(params) {
    return http.post('sessions', params);

  }

  User.delete = function(params) {
    return http.post('user/delete', {username: params.username, updateToken: params.updateToken});
  };

  return User;
});
