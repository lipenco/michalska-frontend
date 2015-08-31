'use strict';

angular.module('kingaFrontend')
  .controller('FeaturedCtrl', function ($scope, kingaApi) {

    kingaApi.Photo.getFeaturedPhotos()
      .success(function (response) {
        $scope.photos = response.photos

        setTimeout(function(){
            $(".rslides").responsiveSlides();
        })
      })
      .error(function (response){
        switch(response && response.code) {
          default:
            console.log("error", response )
            // $scope.errors.usernameErrors.push('An error occurred.');
        }
      });



  });
