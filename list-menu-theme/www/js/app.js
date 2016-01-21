// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    /*.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })*/
  
  // Each tab has its own nav history stack:
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('home', {
    url: '/',
    templateUrl: 'templates/menu.html',
    controller:'MenuCtrl'
  })
   .state('about',{
    url:'/about',
    templateUrl:'templates/about.html',
    controller:'AboutCtrl'
  })
   .state('contact',{
    url:'/contact',
    templateUrl:'templates/contact.html',
    controller:'ContactCtrl'
  })
    .state('inquire',{
    url:'/inquire',
    templateUrl:'templates/inquire.html',
    controller:'InquireCtrl'
  })
    //gallery
  .state('gallery',{
    url:'/gallery',
    templateUrl:'templates/gallery.html',
    controller:'GalleryCtrl'
  })
  .state('galleryPhotos',{
    url:'/gallery/:paramsId',
    templateUrl:'templates/gallery.html',
    controller:'GalleryCtrl'
  })
  .state('photo',{
    url:'/gallery/:paramsId/:id',
    templateUrl:'templates/gallery.html',
    controller:'GalleryCtrl'
  })
  .state('map',{
    url:'/map',
    templateUrl:'templates/map.html',
    controller:'MapCtrl'
  })

  //blog & blog post
 /* .state('blog',{
    url:'/blog',
    templateUrl:'templates/blog.html',
    controller:'blogCtrl'
  }).state('blogPost',{
    url:'/blog/:id',
    templateUrl:'templates/blog.html',
    controller:'blogCtrl'
  });*/
  ;
  // Each tab has its own nav history stack:
  
  $urlRouterProvider.otherwise('/');

});