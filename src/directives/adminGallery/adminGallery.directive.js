"use strict";
var kf = angular.module('kingaFrontend');

kf.directive('adminGallery', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/adminGallery/admin-gallery.html',
    controller: 'AdminGalleryCtrl'
  };
});
