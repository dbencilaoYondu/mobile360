angular.module('starter.services', [])
.factory('Pages',function($http){
  var obj = {};
  
  $http.get('../data.json').then(function(result){
        obj.data = result;
            });
  obj.getSpecs = function(item){
     angular.forEach(obj.data.data.pages,function(a,b){
        //console.log("key:"+key+" ,"+"value:"+value);
        if(a.title == "about"){
           return obj.about = a;
        }
        if(a.title == "gallery"){
          return obj.gallery = a;
        }
        if(a.title == "map"){
          return obj.map = a;
        }
        if(a.title == "contact"){
          return obj.contact = a;
        }
        if(a.title == "inquire"){
          return obj.inquire = a;
        }
         if(a.title == "website"){
          return obj.website = a;
        }
       
    });
  }
  return obj;
})
;
