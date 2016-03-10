
app.controller('AboutCtrl', function($scope,$ionicModal,Pages,$state) {

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
      console.log('About ctrl: ');
      console.log($scope);
      console.log('Parent');
      //data sharing
        $scope.currentData = $state.current.data;
        //set data to parent about pages
        $scope.currentAboutData = $scope.data.scrum2[$scope.currentData];
      //end of data sharing


      console.log($scope.currentParentOfSubInfo);


});