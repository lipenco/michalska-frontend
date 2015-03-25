'use strict';

var kingaFrontend = angular.module('kingaFrontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router',  'kingaApi'])
kingaFrontend.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/featured/featured.html',
        controller: 'FeaturedCtrl',
        authenticate: false
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: false
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl',
        authenticate: false
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        authenticate: false
      })
      .state('editProject', {
        url: '/edit_project',
        templateUrl: 'app/edit_project/edit_project.html',
        controller: 'EditCtrl',
        authenticate: true
      })
      .state('addNewProject', {
        url: '/add_project',
        templateUrl: 'app/add_project/add_project.html',
        controller: 'AddProjectCtrl',
        authenticate: true
      });



    $urlRouterProvider.otherwise('/');

    $httpProvider.defaults.headers.common.Authorization = localStorage.getItem('auth_token');
});

kingaFrontend.run(function($rootScope, $state){


  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if(toState.authenticate && !localStorage.getItem('auth_token')) {
        $state.go('admin');
    }
  });

  // FlashMessages.dismissAll();

});
