'use strict';

angular.module('kingaFrontend')
  .controller('NavbarCtrl', function ($scope) {

    $scope.selectedIndex = 0;

    $scope.select = function(i) {
      $scope.selectedIndex = i;
    };
  });
