"use strict";
var kf = angular.module('kingaFrontend');

kf.directive('flashMessages', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/flashMessages/flash-message-container.html',
    controller: 'FlashMessageCtrl'
  };
});
