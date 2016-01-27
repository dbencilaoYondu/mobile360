angular.module('starter.controllers', [])

.controller('HeaderCtrl',function($scope,Pages){$scope.data = Pages;})
.controller('SettingsCtrl',function($scope,$ionicModal, $ionicHistory,Pages){

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
.controller('MenuCtrl', function($scope,$ionicModal, Pages) {

      $scope.data = Pages;
      console.log(Pages.data.data.pages.length);
      if(Pages.data.data.pages.length > 4){
        $scope.quantity = 3;
      }else{
        $scope.quantity = 4;
      }
      
      //console.log($scope);


     $ionicModal.fromTemplateUrl('moreMenu.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: true,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.oModalSettings = modal;
      });

      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      $scope.openModal = function(index) {
        $scope.oModalSettings.show();
      };

      $scope.closeModal = function(index) {
        $scope.oModalSettings.hide();
      };

})

.controller('AboutCtrl', function($scope,$ionicModal,Pages) {

      $scope.data = Pages;
      Pages.getSpecs();

      $ionicModal.fromTemplateUrl('mission.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.oModal1 = modal;
      });

      // Modal 2
      $ionicModal.fromTemplateUrl('vision.html', {
        id: '2', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.oModal2 = modal;
      });

      $scope.openModal = function(index) {
        if (index == 1) $scope.oModal1.show();
        else $scope.oModal2.show();
      };

      $scope.closeModal = function(index) {
        if (index == 1) $scope.oModal1.hide();
        else $scope.oModal2.hide();
      };


      // console.log($scope);
})
.controller('ContactCtrl', function($scope,Pages) {$scope.data = Pages; Pages.getSpecs();})
.controller('MapCtrl', function($scope,Pages) {$scope.data = Pages;})
.controller('InquireCtrl', function($scope,Pages) {$scope.data = Pages;Pages.getSpecs();})
.controller('GalleryCtrl', function($scope,  $http,$stateParams, $state,Pages,$ionicHistory) {
  $scope.data = Pages;
  $scope.albumId = $stateParams.albumId;
  $scope.id = $stateParams.id;
  $scope.$state = $state;
  Pages.getSpecs();
  // console.log($scope.albumId);
  // console.log($scope.id);
  // console.log($scope);

   $scope.myGoBack = function() {
    window.history.back();
    
  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
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

//console.log($scope);
});