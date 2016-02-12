angular.module('starter.controllers', [])

.controller('HeaderCtrl',function($scope,Pages){$scope.data = Pages;})
.controller('SettingsCtrl',function($scope,$ionicModal,Pages, $ionicHistory){
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

})
.controller('MenuCtrl', function($scope,Pages,$cordovaInAppBrowser) {

      $scope.data = Pages;
       console.log($scope);
       Pages.getSpecs();

       var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };

   $scope.openBrowser = function(title) {
    if(title == 'website'){
      $cordovaInAppBrowser.open($scope.data.website.url, '_self', options)
    
      .then(function(event) {
         // success
      })
    
      .catch(function(event) {
         // error
      });
    }
      
   }
})

.controller('AboutCtrl', function($scope,$ionicModal,Pages) {

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

       console.log($scope);
})
.controller('ContactCtrl', function($scope,Pages) {$scope.data = Pages; Pages.getSpecs();console.log($scope);})
.controller('InquireCtrl', function($scope,Pages) {$scope.data = Pages;Pages.getSpecs();console.log($scope);})
.controller('GalleryCtrl', function($scope,  $http,$stateParams, $state,Pages,$ionicHistory) {
  $scope.data = Pages;
  $scope.albumId = $stateParams.albumId;
  $scope.id = $stateParams.id;
  $scope.$state = $state;
  Pages.getSpecs();

   $scope.myGoBack = function() {
    window.history.back();
    
  };

})

.controller('MapCtrl', function($scope,$interval,$log, Pages,$timeout) {
  
  $scope.map = Pages.data.data.location;
  $scope.options = {
            scrollwheel: true
        };
  $scope.coordsUpdates = 0;
  $scope.dynamicMoveCtr = 0;
  $scope.marker = {
            id: 0,
            options: {
                draggable: false
            },
            events: {
                dragend: function(marker, eventName, args) {
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "",
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
  };
});

