'use strict';

angular.module('kingaFrontend')
  .controller('showProjectCtrl', function ($scope, $state, $stateParams, $http, kingaApi) {

    if ($stateParams.title == true) {
      $scope.description = "Loading..."
      $scope.title = "..."
      setTimeout(function(){
        var layzr = new Layzr({
          threshold: 1000

        });
      });

      return kingaApi.Project.getProject($stateParams.id)
        .success(function (response) {
          $scope.photos = response.project.photos
          $scope.description = response.project.description
          $scope.title = response.project.title
        })
        .error(function (response){
          switch(response && response.code) {
            default:
              console.log("error", response )
              // $scope.errors.usernameErrors.push('An error occurred.');
          }
        });


    } else {
      $scope.description = $stateParams.description
      $scope.title = $stateParams.title
      $scope.photos = $stateParams.photos
    };








  });
