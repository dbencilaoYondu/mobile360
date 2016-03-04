/*
  angular-youtube-mb v1.1.1
  https://github.com/brandly/angular-youtube-embed
*/
angular.module("youtube-embed",["ng"]).service("youtubeEmbedUtils",["$window","$rootScope",function(e,t){function r(e,t){return e.indexOf(t)>-1}function a(){t.$apply(function(){n.ready=!0})}var n={},i=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,o=/t=(\d+)[ms]?(\d+)?s?/;return n.getIdFromURL=function(e){var t=e.replace(i,"$1");if(r(t,";")){var a=t.split(";");if(r(a[1],"%")){var n=decodeURIComponent(a[1]);t=("http://youtube.com"+n).replace(i,"$1")}else t=a[0]}else r(t,"#")&&(t=t.split("#")[0]);return t},n.getTimeFromURL=function(e){e=e||"";var t=e.match(o);if(!t)return 0;var a=t[0],n=t[1],i=t[2];return"undefined"!=typeof i?(i=parseInt(i,10),n=parseInt(n,10)):r(a,"m")?(n=parseInt(n,10),i=0):(i=parseInt(n,10),n=0),i+60*n},n.ready=!1,"undefined"==typeof YT?e.onYouTubeIframeAPIReady=a:YT.loaded?n.ready=!0:YT.ready(a),n}]).directive("youtubeVideo",["youtubeEmbedUtils",function(e){var t=1,r={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},a="youtube.player.";return{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(n,i,o){function d(){var e=Array.prototype.slice.call(arguments);n.$apply(function(){n.$emit.apply(n,e)})}function u(e){var t=r[e.data];"undefined"!=typeof t&&d(a+t,n.player,e),n.$apply(function(){n.player.currentState=t})}function l(e){d(a+"ready",n.player,e)}function y(e){d(a+"error",n.player,e)}function p(){var e=angular.copy(n.playerVars);e.start=e.start||n.urlStartTime;var t=new YT.Player(c,{height:n.playerHeight,width:n.playerWidth,videoId:n.videoId,playerVars:e,events:{onReady:l,onStateChange:u,onError:y}});return t.id=c,t}function f(){(n.videoId||n.playerVars.list)&&(n.player&&"function"==typeof n.player.destroy&&n.player.destroy(),n.player=p())}n.utils=e;var c=o.playerId||i[0].id||"unique-youtube-embed-id-"+t++;i[0].id=c,n.playerHeight=n.playerHeight||390,n.playerWidth=n.playerWidth||640,n.playerVars=n.playerVars||{};var s=n.$watch(function(){return n.utils.ready&&("undefined"!=typeof n.videoUrl||"undefined"!=typeof n.videoId||"undefined"!=typeof n.playerVars.list)},function(e){e&&(s(),"undefined"!=typeof n.videoUrl?n.$watch("videoUrl",function(e){n.videoId=n.utils.getIdFromURL(e),n.urlStartTime=n.utils.getTimeFromURL(e),f()}):"undefined"!=typeof n.videoId?n.$watch("videoId",function(){n.urlStartTime=null,f()}):n.$watch("playerVars.list",function(){n.urlStartTime=null,f()}))});n.$watchCollection(["playerHeight","playerWidth"],function(){n.player&&n.player.setSize(n.playerWidth,n.playerHeight)}),n.$on("$destroy",function(){n.player&&n.player.destroy()})}}}]);