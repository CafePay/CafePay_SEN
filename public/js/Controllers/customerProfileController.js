angular.module('Cafepay.Controllers').controller('customerProfileController',["$scope","$http","$location","token",function($scope,$http,$location,token){token.setnotoken(!1);$scope.$on('balance',function(event,data){$scope.balance=data.data})
$http.get('/customer/profile').success(function(response){console.log(response);if(response.err=="notoken"){token.setnotoken(!0);$location.path("/login")}
else if(response.err=="forbidden"){$location.path("/forbidden")}
$scope.uname=response.username;$scope.balance=response.balance})
$scope.logout=function(){$http.post('/logout').success(function(response){})}}])