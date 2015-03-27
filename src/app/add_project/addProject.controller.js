
'use strict';

angular.module('kingaFrontend')
  .controller('AddProjectCtrl', function ($scope, $http,  $stateParams, kingaApi) {

    if ($stateParams.id != true) {
      $scope.title = $stateParams.title;
      $scope.thumbnail = $stateParams.thumbnail;
      $scope.description = $stateParams.description;
      $scope.project_date = $stateParams.project_date;
      $scope.url = null;
      $scope.horizontal = null;
      $scope.project_id = $stateParams.id;
      $scope.photos = $stateParams.photos;

    } else {
      $scope.title = null;
      $scope.thumbnail = null;
      $scope.description = null;
      $scope.project_date = null;
      $scope.url = null;
      $scope.horizontal = null;
      $scope.project_id = null;
      $scope.photos = [];

    }

    $scope.projectExist = function() {
      return true;
    };


    $scope.attemptSave = function() {
      $scope.asyncSave();
      return true
    }

    $scope.attemptSavePhoto = function() {
      $scope.asyncSavePhoto();
      return true
    }

    $scope.asyncSave = function() {
      $scope.loginError = null;

      if (!$scope.title) {
        $scope.loginError = "title and thumbnail cannot be blank.";
        return;
      }
      var params = {
        title : $scope.title,
        thumbnail: $scope.thumbnail,
        description: $scope.description,
        project_date : $scope.project_date
      }

      kingaApi.Project.create(params)
      .success(function(response) {
        $scope.project_id = response.project.id;
        $scope.projectExist = false;

      }).error(function(body, status) {

      });

    };

    $scope.addPhoto = function() {
      $scope.showPhotoInput = function() {
        return true;
      }
    };

    $scope.deletePhoto = function(photo) {
      photo.project_id = $scope.project_id
      kingaApi.Photo.delete(photo)
      .success(function(response) {
        $scope.photos.splice( $scope.photos.indexOf(photo), 1 );
      }).error(function(body, status) {

      });

    };

    $scope.asyncSavePhoto = function() {
      var params = {
        project_id : $scope.project_id,
        url : $scope.url,
        horizontal: $scope.horizontal
      }
      kingaApi.Photo.create(params)
      .success(function(response) {
        $scope.photos.push(response.photo);
        $scope.showPhotoInput = false;
        $scope.url = null;
        $scope.horizontal = null;

      }).error(function(body, status) {

      });

    };






  });
