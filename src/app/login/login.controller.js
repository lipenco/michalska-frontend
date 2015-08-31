'use strict';

angular.module('kingaFrontend')
  .controller('LoginCtrl', function ($scope, $http,  $state, kingaApi, $timeout, FlashMessages) {
    $scope.username   = null;
    $scope.password   = null;
    $scope.loginError = null;

    if (localStorage.getItem('auth_token')) {
      $state.go('editProject');
    }


    $scope.attemptLogin = function() {
      $scope.asyncLogin();
      return true;
    };



    $scope.asyncLogin = function() {
        $scope.loginError = null;

        if (!$scope.username) {
          $scope.loginError = "Username and password cannot be blank.";
          return;
        }
        var params = {
          email: $scope.username,
          password: $scope.password
        }
        kingaApi.User.getToken(params)
        .success(function(response) {
          FlashMessages.add({
            title: 'You are logged in!',
            info: 'Hello beutiful Kinga, add some awesome projects to your site'
          });
          localStorage.setItem('auth_token', response.user.auth_token)
          $state.go('editProject');

  
        }).error(function(body, status) {

        });



      };



  });
