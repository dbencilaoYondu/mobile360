app.controller('MapCtrl', function($scope ,$state, Pages,$cordovaGeolocation,$ionicLoading,$ionicPlatform) {

 $ionicPlatform.ready(function() { 

         $scope.currentData = $state.current.data;

          //transfer data to sub rss pages
          if($scope.data.scrum2[$scope.currentData]){
            //set data to parent rss pages
            $scope.currentMapData = $scope.data.scrum2[$scope.currentData];
          }else{
             $scope.currentMapData = $scope.currentParentOfSubInfo;
          }

        console.log($scope);
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
 
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
             
            //var myLatlng = new google.maps.LatLng(-33.890542, -33.890542);

            var mapOptions = {
                center: {lat: $scope.currentMapData.mapOptions.center.lat, lng: $scope.currentMapData.mapOptions.center.lng},
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
            
           // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
            angular.forEach($scope.currentMapData.mapOptions.markers,function(value,key){
              console.log(key);
              console.log(value);
              var marker = new google.maps.Marker({
                position: {lat: $scope.currentMapData.mapOptions.markers[key].lat, lng:$scope.currentMapData.mapOptions.markers[key].lng},
                animation: google.maps.Animation.DROP,
                map:map,
                title: $scope.currentMapData.mapOptions.markers[key].title,
                zIndex:$scope.currentMapData.mapOptions.markers[key].zIndex
              });

            });
            
            $scope.map = map;   
            $ionicLoading.hide();  
             
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    });           


});