
'use strict';

angular.module('kingaFrontend')
  .controller('EditCtrl', function ($scope, $state, $http, kingaApi, FlashMessages) {

    $scope.delete = function(project) {
      kingaApi.Project.delete(project)
      .success(function (response) {
        FlashMessages.add({
          title: 'You deleted the project:' + project.title,
          info: 'All photos belongign to this picture were also deleted'
        });
        $scope.projects.splice( $scope.projects.indexOf(project), 1 );
      });
    }

    $scope.publish = function(project, publish) {
      project.published = publish;
      kingaApi.Project.update(project)
      .success(function (response) {
        FlashMessages.add({
          title: 'You published:' + project.title,
          info: 'Your audience can see it now'
        });

      });
    };

    $scope.edit = function(project) {
      $state.go('addNewProject', project);
    };

    kingaApi.Project.getAllProjects()
      .success(
      function (response) {
        $scope.projects = response.projects
      })
      .error(
      function (response){
        switch(response && response.code) {
          default:
            console.log("error", response )
            // $scope.errors.usernameErrors.push('An error occurred.');
        }
      });




  });
