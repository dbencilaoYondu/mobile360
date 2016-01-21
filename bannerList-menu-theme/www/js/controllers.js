var appControllers = angular.module('starter.controllers', [])


appControllers.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
}]);


appControllers.controller('HeaderCtrl',function($scope,Pages){$scope.data = Pages;});
appControllers.controller('SettingsCtrl',function($scope,$ionicModal, $ionicHistory){

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
appControllers.controller('MenuCtrl', function($scope,Pages) {

      $scope.data = Pages;
       console.log($scope);
});

appControllers.controller('AboutCtrl', function($scope,$ionicModal,Pages) {

      $scope.data = Pages;


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


       console.log($scope);
});
appControllers.controller('ContactCtrl', function($scope,Pages) {$scope.data = Pages;console.log($scope);});
appControllers.controller('MapCtrl', function($scope,Pages) {$scope.data = Pages;console.log($scope);});
appControllers.controller('InquireCtrl', function($scope,Pages) {$scope.data = Pages;console.log($scope);});
appControllers.controller('GalleryCtrl', function($scope,$stateParams, Pages) {
  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  $scope.id = $stateParams.id;
})

appControllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

appControllers.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



/*appControllers.controller('MapCtrl', function($scope, $ionicLoading, $compile,$timeout,Pages) {
      
      ionic.Platform.ready(function() {
        var myLatlng = new google.maps.LatLng(Pages.data.data.location.lat,Pages.data.data.location.long);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;
    });

      
});*/

appControllers.controller('MapCtrl', function($scope,$interval,$log, Pages,$timeout) {
  
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

console.log($scope);
});

