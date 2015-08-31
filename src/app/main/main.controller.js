'use strict';

angular.module('kingaFrontend')
  .controller('MainCtrl', function ($scope, kingaApi) {

    kingaApi.Project.getPublishedProjects()
      .success(function (response) {
        $scope.projects = response.projects
        setTimeout(function(){
          $('#frills').frillsInit();
          var layzr = new Layzr({});
        });
      })
      .error(function (response){
        switch(response && response.code) {
          default:
            console.log("error", response )
            // $scope.errors.usernameErrors.push('An error occurred.');
        }
      });



  });
