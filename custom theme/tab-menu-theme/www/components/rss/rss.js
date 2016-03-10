app.controller("FeedCtrl", ['$scope','FeedService','Pages','$state', function ($scope,Feed,Pages,$state) {    
    $scope.data = Pages;
    Pages.getSpecs();  
    console.log($scope);

    $scope.loadFeed=function(url){
        Feed.parseFeed(url).then(function(res){
            console.log(res);
            $scope.feeds = res.data.responseData.feed.entries;
        });
    }

    $scope.currentData = $state.current.data;
    //set data to parent rss pages
    $scope.currentRssData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub rss pages
    if($scope.$parent.currentParentOfSubInfo){
      $scope.currentRssData = $scope.$parent.currentParentOfSubInfo;
    }
    console.log($scope.$parent.currentParentOfSubInfo);

}]);