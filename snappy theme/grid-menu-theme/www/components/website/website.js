app.controller('WebsiteCtrl', function($scope,Pages,$state,$sce) {
  $scope.data = Pages;
  
  $scope.$sce = $sce;
  //data sharing
    $scope.currentData = $state.current.data;

    if($scope.data.scrum2[$scope.currentData]){
       //set data to parent contact pages
      $scope.currentWebsiteData    = $scope.data.scrum2[$scope.currentData];
      $scope.currentWebsiteDataURL = $sce.trustAsResourceUrl($scope.currentWebsiteData.url);
    }
    if($scope.currentParentOfSubInfo){
       $scope.subWebsiteData    = $scope.currentParentOfSubInfo;
      $scope.subWebsiteDataURL = $sce.trustAsResourceUrl($scope.$parent.currentParentOfSubInfo.url);
    }

    //transfer data to sub contact pages
    console.log('contact ctrl' );
    console.log($scope.currentParentOfSubInfo);
    console.log($scope);
  //end of data sharing

});