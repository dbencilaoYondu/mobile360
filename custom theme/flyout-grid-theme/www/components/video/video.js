app.controller('VideoCtrl', function($scope,$state, $http, Pages){

    //get youtube iframe api
     $.getScript( "https://www.youtube.com/iframe_api", function( data, textStatus, jqxhr ) {
      console.log( data ); // Data returned
      console.log( textStatus ); // Success
      console.log( jqxhr.status ); // 200
      console.log( "Load was performed." );
    });

    $scope.data = Pages;
    $scope.currentData = $state.current.data;

    //transfer data to sub rss pages
    if($scope.data.scrum2[$scope.currentData]){
      //set data to parent rss pages
      $scope.currentVideoData = $scope.data.scrum2[$scope.currentData];
    }else{
       $scope.currentVideoData = $scope.currentParentOfSubInfo;
    }

    console.log('video ctrl');
    console.log($scope);

     $scope.youtubeParams = {
         key: $scope.currentVideoData.youtube.key,
         type: 'video',
         maxResults: $scope.currentVideoData.youtube.resultLimit,
         part: 'id,snippet',
         order: 'date',
         //forUsername: 'aybutchikik',
         channelId: $scope.currentVideoData.youtube.channelId
     }
     
     $http.get('https://www.googleapis.com/youtube/v3/search', {

        params: $scope.youtubeParams

      })

      .success(function(response){

        $scope.videos  = response.items;

        angular.forEach(response.items, function(child){
             console.log (child);
        });
      });
       
      $scope.playerVars = {
       rel: 0,
       showinfo: 0,
       modestbranding: 0,
      }
});