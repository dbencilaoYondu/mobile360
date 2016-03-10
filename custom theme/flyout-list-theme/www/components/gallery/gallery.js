app.controller('GalleryCtrl', function($scope,$stateParams,$state, Pages) {

  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  $scope.id = $stateParams.id;
  console.log('Gallery Ctrl:');
  console.log($scope);

  $scope.galleryWrapper = true ;
  //show all photos in an album
  $scope.showAlbum = function($index){
    
      $scope.activeAlbum = $index;
      $scope.galleryWrapper = false;
      $scope.albumWrapper = true;

      $scope.currentAlbumsObj = $scope.data.scrum2[$scope.currentData].albums[$scope.activeAlbum];

      console.log($scope);
  }

  // show single photo
  $scope.showPhoto = function($index){
    
      $scope.activePhoto = $index;
      //$scope.activeAlbum = false;
      $scope.albumWrapper = false;
      $scope.photoWrapper = true;

      $scope.singlePhoto = $scope.data.scrum2[$scope.currentData].albums[$scope.activeAlbum].photos[$scope.activePhoto];
  
    console.log($scope);
  }  

   //back to gallery list
  $scope.backToGallery = function(){
    $scope.galleryWrapper = true;
    $scope.albumWrapper = false;
  }
  //back to albums
  $scope.backToAlbums = function(){
    $scope.galleryWrapper = false;
    $scope.albumWrapper = true;
    $scope.photoWrapper = false;
  }
  

  $scope.currentData = $state.current.data;
    //set data to parent rss pages
    $scope.currentGalleryData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub rss pages
    if($scope.currentParentOfSubInfo){
      $scope.currentGalleryData = $scope.currentParentOfSubInfo;
    }
    console.log('scope with sub info');
    console.log($scope);
    console.log('sub info');
    console.log($scope.currentParentOfSubInfo);

});