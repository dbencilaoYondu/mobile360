app.controller('FormCtrl', function($scope,Pages,$state, $http,$ionicScrollDelegate,$httpParamSerializerJQLike ) {
  $scope.data = Pages;
  Pages.getSpecs();
  
  $scope.form = {};

  Object.toparams = function ObjecttoParams(obj) 
  {
    var p = [];
    for (var key in obj) 
    {
      p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
  };

  $scope.submitForm = function(){
  
    $scope.form.subject = $scope.currentFormData.subject;
    $scope.form.emailId = $scope.currentFormData.emailId;
    $scope.form.label = $scope.currentFormData.label;
    $scope.form.description = $scope.currentFormData.description;
    $scope.form.formName = $scope.currentFormData.formName;

     $scope.stringData = JSON.stringify($scope.form);
    $http(
    {
      method:'POST',
      url:$scope.currentFormData.api,
      data:Object.toparams({'data':$scope.stringData}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function successCallback(response){
        console.log(response);
        if(response.statusText == 'OK'){
          $scope.success = $scope.currentFormData.onSuccess;
        }else{
          $scope.error = $scope.currentFormData.onError;
        }
      },function errorCallback(response){
        console.log(response);
        $scope.error = $scope.currentFormData.onError;
      });
     $scope.form = {};
     $ionicScrollDelegate.scrollTop();
  }

  //data sharing
  $scope.currentData = $state.current.data;
    //set data to parent form pages
    $scope.currentFormData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub form pages
    if($scope.$parent.currentParentOfSubInfo){
      $scope.currentFormData = $scope.$parent.currentParentOfSubInfo;
    }
    console.log($scope.$parent.currentParentOfSubInfo);
  //end of data sharing

  console.log('form ctrl');
  console.log($scope);

});