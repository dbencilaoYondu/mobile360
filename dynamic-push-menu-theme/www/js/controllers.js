var app = angular.module('starter.controllers', [])


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
                    }
                }
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
app.controller('AppCtrl', function ($scope, $state, $ionicHistory, $cordovaInAppBrowser) {
    $scope.stopLoading();

    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true,
        historyRoot: true
    });

    $scope.appName = app.baseConfig.appName;
    $scope.menuItems = app.baseConfig.menuItems;
    console.log($scope);

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
     };

     $scope.openBrowser = function(type,index) {
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
app.controller('DashboardCtrl', function ($scope, $state) {
    $scope.pageTitle = 'Dashboard';
});

app.controller('SettingsCtrl',function($scope,$ionicModal,Pages, $ionicHistory){
    $scope.data = Pages;
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

});
app.controller('MenuCtrl', function($scope,Pages,$cordovaInAppBrowser) {

      $scope.data = Pages;
       console.log($scope);
       Pages.getSpecs();

       var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };

   $scope.openBrowser = function(title) {
    if(title == "website"){
      $cordovaInAppBrowser.open('https://www.google.com', '_self', options)
    
      .then(function(event) {
         // success
      })
    
      .catch(function(event) {
         // error
      });
    }
      
   }
});

app.controller('AboutCtrl', function($scope,$ionicModal,Pages) {

      $scope.data = Pages;
      Pages.getSpecs();

      $ionicModal.fromTemplateUrl('aboutMore.html', {
     /* id: $index, // We need to use and ID to identify the modal that is firing the event!*/
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });


      $scope.openModal = function(index) {
        $scope.modal.show(index);
        $scope.$index = index;
      };

      $scope.closeModal = function(index) {
        $scope.modal.hide();
      };

      // console.log($scope);
});
app.controller('ContactCtrl', function($scope,Pages) {$scope.data = Pages; Pages.getSpecs();console.log($scope);});
app.controller('FormCtrl', function($scope,Pages, $http) {
  $scope.data = Pages;
  Pages.getSpecs();
  console.log($scope);

  $scope.form = {}

  $scope.submitForm = function(){
    console.log($scope);
    console.log($scope.form);
    $http.post($scope.data.form.api,$scope.form)
      .then(function(data){
        if(data.status == true){
          $scope.form.status = true;
        }
      });
    $scope.form = {}
  }
  console.log($scope);
});
app.controller('GalleryCtrl', function($scope,  $http,$stateParams, $state,Pages,$ionicHistory) {
  $scope.data = Pages;
  $scope.albumId = $stateParams.albumId;
  $scope.id = $stateParams.id;
  $scope.$state = $state;
  Pages.getSpecs();

   $scope.myGoBack = function() {
    window.history.back();
    
  };
  console.log($scope);
});

app.controller("FeedCtrl", ['$scope','FeedService','Pages', function ($scope,Feed,Pages) {    
    $scope.data = Pages;
    Pages.getSpecs();  
    console.log($scope);

    $scope.loadFeed=function(url){
        Feed.parseFeed(url).then(function(res){
            console.log(res);
            $scope.feeds=res.data.responseData.feed.entries;
        });
    }

}]);

app.controller('MapCtrl', function($scope ,$state, Pages,$cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });


});

