// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$window,$location,$rootScope,AppData) {


  $ionicPlatform.ready(function($http) {
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
    //hide navigation on settings button click
    //place back button when settings button is clicked
    jQuery('.back').click(function(){
       jQuerywindow.history.back();
    });
    /*DOM manipulation*/
    //append more button to tab menu bar
    jQuery('.tab-nav').append('<div class="more"><i class="ion-more"></i></div>');
    //slide up and down more menu 
    jQuery(".more").click(function (e) {
      if (jQuery(".tab-more").hasClass("slideDown"))
          jQuery(".tab-more").removeClass("slideDown").addClass("slideUp");
      else
          jQuery(".tab-more").removeClass("slideUp").addClass("slideDown");
    });
    // more menu minimize button
    jQuery('.menu-down').click(function(){
      jQuery(".tab-more").removeClass("slideUp").addClass("slideDown");
    });
    //close more menu when a link is clicked
    jQuery('.tab-more').on('click','a',function(){
      jQuery(".tab-more").removeClass("slideUp").addClass("slideDown");
    });
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  // setup an abstract state for the tabs directive
  /*.state('home', {
    url: '/',
    //templateUrl: 'templates/home.html',
    controller:'HomeCtrl'
  })*/
   .state('about',{
    url:'/about',
    templateUrl:'templates/about.html',
    controller:'aboutCtrl'
  })
  .state('settings',{
    url:'/settings',
    templateUrl:'templates/settings.html',
    controller:'settingsCtrl'
  })
  .state('contact',{
    url:'/contact',
    templateUrl:'templates/contact.html',
    controller:'contactCtrl'
  })
  //gallery
  .state('gallery',{
    url:'/gallery',
    templateUrl:'templates/gallery.html',
    controller:'galleryCtrl'
  })
  .state('galleryPhotos',{
    url:'/gallery/:paramsId',
    templateUrl:'templates/gallery.html',
    controller:'galleryCtrl'
  })
  .state('photo',{
    url:'/gallery/:paramsId/:id',
    templateUrl:'templates/gallery.html',
    controller:'galleryCtrl'
  })

  //blog & blog post
  .state('blog',{
    url:'/blog',
    templateUrl:'templates/blog.html',
    controller:'blogCtrl'
  }).state('blogPost',{
    url:'/blog/:id',
    templateUrl:'templates/blog.html',
    controller:'blogCtrl'
  });
  // Each tab has its own nav history stack:
  
   $urlRouterProvider.otherwise('/about');
});
