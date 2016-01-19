var appCtrl = angular.module('starter.controllers', []);

appCtrl.controller('navCtrl', function($scope, AppData,getData) {
	// ref AppData
	AppData.list(function(list){
		$scope.data = list;
	});
	$scope.quantity = 4;
	//$scope.navObj = getData.data;
	
	//console.log($scope.navObj);
	
	//console.log($scope.data);
   /* if(window.location.pathname == "/"){
       window.location = "#/" + $scope.data.home;
    }*/

	console.log($scope);
});

appCtrl.controller('HomeCtrl',function($scope,$ionicSlideBoxDelegate,AppData){
	 $scope.nextSlide = function() {
	    $ionicSlideBoxDelegate.next();
	  }
	  AppData.list(function(list){
		$scope.data = list;
	});
/*	var home = $('.navList li').first().attr('data-name');
	console.log(home);
	console.log($scope);*/
});
appCtrl.controller('aboutCtrl',function($scope,$stateParams,AppData){
	AppData.list(function(list){
		$scope.data = list;
	});
	$scope.paramsId = $stateParams.id
	
});
appCtrl.controller('blogCtrl',function($scope,$stateParams,AppData){
	AppData.list(function(list){
		$scope.data = list;
	});
	$scope.paramsId = $stateParams.id

});
appCtrl.controller('galleryCtrl',function($scope,$stateParams,AppData,$location){
	AppData.list(function(list){
		$scope.data = list;
	});
	$scope.paramsId = $stateParams.paramsId;
	$scope.id = $stateParams.id;
});
appCtrl.controller('contactCtrl',function($scope,$stateParams,AppData){
	AppData.list(function(list){
		$scope.data = list;
	});
	$scope.paramsId = $stateParams.id

});

appCtrl.controller('settingsCtrl',function($scope,$stateParams,AppData){
	AppData.list(function(list){
		$scope.data = list;
	});
	$scope.paramsId = $stateParams.id
	$('#accountBtn').click(function(){
      // window.location = "/";
      if(window.location.hash == "#/settings"){
      		window.history.back();
      	}
	});
});