"use strict";
var api = angular.module('kingaApi', []);

api.service('kingaApi', function(http, User, Project, Photo, Flicker) {
  var kingaApi = {};

  kingaApi.User = User;
  kingaApi.Project = Project;
  kingaApi.Photo = Photo;
  kingaApi.Flicker = Flicker;

  return kingaApi;
});
