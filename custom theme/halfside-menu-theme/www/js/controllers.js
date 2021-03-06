var app = angular.module('starter.controllers', ['youtube-embed'])



/**
 * This variable will store the base configuration which we get using the config service in AppCtrl
 */
app.baseConfig = false;

/**
 * This controllers reads the configuration and adds the states
 */
app.controller('InitCtrl', function ($scope, $state, $timeout, $ionicHistory, config) {
    $scope.startLoading();

    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true,
        historyRoot: true
    });

    var existingStates = [];

    var addStates = function (states) {
        existingStates = getExistingStates();
        for (var idx in states) {
            addState(states[idx]);
        }
    };

    var getExistingStates = function () {
        var states = $state.get();
        var result = [];
        for (var idx in states) {
            result.push(states[idx].name)
        }
        return result;
    };

    var stateExist = function (state) {
        return existingStates.indexOf(state) !== -1;
    };

    var setDefaultState = function (state) {
        // Store defaultState in defaultStateSafe as it gets overwritten while re-initializing
        app.baseConfig.defaultState = app.defaultStateSafe = state.state;
        app.urlRouterProvider.otherwise(state.state);
    };

    var addState = function (state) {
        app.baseConfig.defaultState = app.defaultStateSafe;

        // Only add states that are not there yet
        if (!stateExist(state.state)) {
            if (state.defaultState) {
                setDefaultState(state);
            }
            app.stateProvider.state(state.state, {
                url: state.url,
                views: {
                    'menuContent': {
                        templateUrl: state.templateUrl,
                        controller: state.controller
                    },
                    'sideMenu':{
                       templateUrl:'templates/sideMenu.html',
                       controller:'SettingsCtrl'            
                     },
                     'subMenu':{
                       templateUrl:'templates/subMenu.html',
                       controller:'SettingsCtrl'            
                     }
                },
                parentId:state.parentId,
                 data:state.data
            });
        }
    };

    $timeout(function () {

        // Read the configuration
        config.config().then(function (response) {

            // Set the baseConfig
            app.baseConfig = response.data;

            // Add the states
            addStates(app.baseConfig.states);

            // Go to the default state
            $state.go(app.baseConfig.defaultState, {}, {location: true})
        });

    }, 1000);

});

/**
 * The AppCtrl takes care of the parent view for all the other views
 * It is defined in one of the two static states in this application
 */
app.controller('AppCtrl', function ($scope, $state, $ionicHistory, $cordovaInAppBrowser,Pages) {
    

    $scope.stopLoading();

    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true,
        historyRoot: true
    });

    $scope.appName = app.baseConfig.appName;
    $scope.menuItems = app.baseConfig.menuItems;
    

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
     };

     $scope.openBrowser = function(type,index) {
      console.log('clicked open browser ' + type + ' '+ index);
      console.log(type );

      if(type == 'website'){
        $cordovaInAppBrowser.open($scope.menuItems[index].url, '_self', options)
      
        .then(function(event) {
           // success
        })
      
        .catch(function(event) {
           // error
        });
      }
        
     }

     $scope.data = Pages;
     $scope.currentData = $state.current.data;
     Pages.getSpecs();

    //to trigger sub page switch inside the menu wrapper
     $scope.subsSwitch = function(label,index){
        $scope.subsOn = true;

        $('.backdrop.active').removeClass('visible');
       
        if(Pages.data.data.menuItems[index].label == label){

          $scope.currentParentOfSub = Pages.data.data.menuItems[index].subMenu;

          console.log('subSwitch: ');
          console.log($scope.currentParentOfSub);
          console.log($scope);
        }
        //$('.backdrop.active').toggleClass('visible');
      }

      //to trigger sub page :  collect current data of the same widget type
      $scope.pageInfo = function(index){
         $scope.subsOn = false;
         $scope.currentParentOfSubInfo = $scope.currentParentOfSub.menuItems[index];
         console.log('Pageinfo: ');
         console.log(index);
         $scope.aboutIndex = index;
         console.log($scope.currentParentOfSubInfo);
         $('.backdrop.active').toggleClass('visible');
      }

      $scope.backToParentMenu = function(){
          $scope.subsOn = false;
        }

      $scope.backdropHide = function() {
        $('.backdrop.active').removeClass('visible');
        $('.flyout').removeClass('active');
      }
});

/**
 * The LayoutCtrl is attached to the body
 */
app.controller('LayoutCtrl', function ($scope, $state, $ionicLoading) {
    $scope.init = function () {
        $state.go('init', true);
    };
    $scope.defaultState = function () {
        $state.go(app.baseConfig.defaultState, true);
    };
    $scope.startLoading = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
    $scope.stopLoading = function () {
        $ionicLoading.hide();
    };
});



app.controller('HeaderCtrl',function($scope,Pages){$scope.data = Pages;});
app.controller('SettingsCtrl',function($scope,$ionicModal,Pages, $ionicHistory, $timeout){

    $scope.data = Pages;
    Pages.getSpecs();

    if($scope.data.data.data.headerText){
      $scope.headerText = $scope.data.data.data.headerText;
    }else{
      $scope.headerText = $scope.data.data.data.applicationName;
    }
    
     $ionicModal.fromTemplateUrl('settings.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.oModalSettings = modal;
      });

      $scope.openModal = function(index) {
        $scope.oModalSettings.show();
      };

      $scope.closeModal = function(index) {
        $scope.oModalSettings.hide();
      };

       $scope.myGoBack = function() {
          $ionicHistory.goBack();
        };

        $scope.flyOut = function(){
          $('.flyout').toggleClass('active');
          $scope.subsOn = false;
          if($('.menuList.menu1 > li').length > 6){
             $scope.withHeight = true;
          }else{
             $scope.withHeight = false;
          }
        }
        $scope.flyBack = function(){
          $('.flyout').removeClass('active');
        }

        //Show a backdrop for one second
        $scope.backdrop = function() {
          $('.backdrop.active').toggleClass('visible');
        };
         $scope.backdropActive = function() {
          $('.backdrop.active').addClass('visible');
        };
       

        //for sorting menu orientation
        $scope.sortIcon = "ion-ios-more-outline";
        $scope.sortMenu = function(){
          if($('.menu1').hasClass('active')){
            $('.menu1').removeClass('active');
             $('.menu2').addClass('active');
             $scope.sortIcon = "ion-grid"
          }else{
           $('.menu2').removeClass('active');
             $('.menu1').addClass('active');
             $scope.sortIcon = "ion-ios-more-outline"
          }
        }
});

app.controller('BlankCtrl',function($scope,Pages,$timeout){
  $scope.blankOn = true;
  $('.backdrop.active').removeClass('visible');
});

app.controller('MenuPreviewCtrl',function($scope,Pages,$timeout){
  $timeout(function() {
     $('.flyout').addClass('active');
     $('.backdrop.active').addClass('visible');
  }, 10);
});
app.controller('MenuCtrl', function($scope,Pages,menuInfo) {
      $scope.data = Pages;
      console.log('Menu ctrl: ');
      console.log($scope);
});
