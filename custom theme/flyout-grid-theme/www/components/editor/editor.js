

app.controller('EditorCtrl', function($scope,$stateParams, Pages, $sce,$state) {
  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  
   console.log('editor');
   console.log($scope);
   $scope.$sce = $sce;

   //data sharing
    $scope.currentData = $state.current.data;
   
    //transfer data to sub contact pages
    if($scope.currentParentOfSubInfo){
      $scope.currentEditorData = $scope.currentParentOfSubInfo;
       $scope.currentEditorDataHtml = $sce.trustAsHtml($scope.currentEditorData.content);
    }else{
       //set data to parent contact pages
      $scope.currentEditorData = $scope.data.scrum2[$scope.currentData];
      $scope.currentEditorDataHtml = $sce.trustAsHtml($scope.data.scrum2[$scope.currentData].content);
    }
  //end of data sharing
});