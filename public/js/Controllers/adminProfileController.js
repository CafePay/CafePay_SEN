angular.module('Cafepay.Controllers').controller('adminProfileController',["$scope","$http","$location","token",function($scope,$http,$location,token){token.setnotoken(!1);$http.get('/admin/profile').success(function(response){console.log(response);if(response.err=="notoken"){token.setnotoken(!0);$location.path("/login")}
else if(response.err=="forbidden"){$location.path("/forbidden")}
$scope.uname=response.username})
$scope.logout=function(){$http.post('/logout').success(function(response){})}}])