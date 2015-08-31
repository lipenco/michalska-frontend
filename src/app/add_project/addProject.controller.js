
'use strict';

angular.module('kingaFrontend')
  .controller('AddProjectCtrl', function ($scope, $http, $state, $stateParams, kingaApi, FlashMessages) {

    if ($stateParams.id != true) {
      $scope.title = $stateParams.title;
      $scope.thumbnail = $stateParams.thumbnail;
      $scope.flickr_name = $stateParams.flickr_name;
      $scope.description = $stateParams.description;
      $scope.project_date = new Date($stateParams.project_date);
      $scope.project_id = $stateParams.id;
      $scope.photos = $stateParams.photos;
      $scope.projectError = null;
      $scope.projectExist = function() {
        return true;
      };


    } else {
      $scope.title = null;
      $scope.thumbnail = null;
      $scope.flickr_name = null;
      $scope.description = null;
      $scope.project_date = null;
      $scope.project_id = null;
      $scope.photos = null;
      $scope.projectError = null;
      $scope.projectExist = function() {
        return false;
      };
    }




    $scope.attemptSave = function() {
      $scope.asyncSave();
      return true
    }



    $scope.asyncSave = function() {
      $scope.loginError = null;

      if (!$scope.title) {
        $scope.loginError = "title and flickr name cannot be blank.";
        return;
      }

      var params = {
        title : $scope.title,
        flickr_name: $scope.flickr_name,
        description: $scope.description,
        project_date : $('#project_date').val(),
      }



      if ($stateParams.id != true) {
        params.id = $stateParams.id
        kingaApi.Project.update(params)
        .success(function(response) {
          $scope.project_id = response.project.id;
          $scope.thumbnail = response.project.thumbnail;
        }).error(function(body, status) {

        });

      } else {
        kingaApi.Project.create(params)
        .success(function(response) {
          $scope.project_id = response.project.id;
          $scope.thumbnail = response.project.thumbnail;
          $scope.projectExist = function() {
            return true;
          };

        }).error(function(body, status) {

        });

      }

    };

    $scope.syncPhotos = function() {
      $scope.projectError = null;
      var project_id = $scope.project_id;
      $scope.photos = null;

      FlashMessages.add({
        title: 'It will take  fiew seconds',
        info: 'please wait...',
        type: 'info'
      });

      kingaApi.Flicker.getPhotosFromPhotoset(project_id)
      .success(function(response) {
        console.log(response)
        $scope.photos = response.project.photos;
        FlashMessages.add({
          title: 'Great! You can see your photos below',
          type: 'success'
        });
      }).error(function(body, status) {
        switch(status) {
          case 500:
            console.log('error22')
            FlashMessages.add({
              title: 'Something went wrong',
              info: 'please check it again',
              type: 'error'
            });
            break;
          default:
            console.log("error", status )
        }
      });
    };


  });
