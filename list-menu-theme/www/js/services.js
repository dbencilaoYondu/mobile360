angular.module('starter.services', [])
.factory('Pages',function($http){
  var obj = {};
  
  $http.get('../data.json').then(function(result){
        obj.data = result;
            });

  return obj;
})
;
