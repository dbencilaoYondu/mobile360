app.controller('WebsiteCtrl', function($scope,Pages,$state,$sce) {
  $scope.data = Pages;
  console.log('contact ctrl' );
  console.log($scope);

  $scope.$sce = $sce;
  //data sharing
    $scope.currentData = $state.current.data;
    //set data to parent contact pages
    $scope.currentWebsiteData = $scope.data.scrum2[$scope.currentData];
    $scope.currentWebsiteDataURL = $sce.trustAsResourceUrl($scope.data.scrum2[$scope.currentData].url);
    //transfer data to sub contact pages
    if($scope.$parent.currentParentOfSubInfo){
      $scope.currentContactData = $scope.$parent.currentParentOfSubInfo;
    }
  //end of data sharing
    console.log($scope.$parent.currentParentOfSubInfo);
});