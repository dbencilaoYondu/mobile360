angular.module('starter.services', [])
.factory('Pages',function($http){
  var obj = {};
  
  $http.get('../data.json').then(function(result){
        obj.data = result;
        obj.menuCount = result.length;
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
    });
  }
  return obj;
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});