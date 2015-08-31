'use strict';

angular.module('kingaFrontend')
  .controller('ContactCtrl', function ($scope, $timeout) {
      $scope.showAnimation = false
      $timeout(function() {
        $scope.showAnimation = true
      }, 400)

  });
