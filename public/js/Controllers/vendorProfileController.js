angular.module('Cafepay.Controllers').controller('vendorProfileController',["$scope","$http","$location","token","$rootScope",function($scope,$http,$location,token,$rootScope){token.setnotoken(!1);$scope.changebalance=function(data){console.log("hmmm")
$scope.balance=data}
$scope.$on('balance',function(event,data){console.log("parent.."+data)
$scope.balance=data.data})
$http.get('/vendor/profile').success(function(response){console.log(response);if(response.err=="notoken"){token.setnotoken(!0);$location.path("/login")}
else if(response.err=="forbidden"){$location.path("/forbidden")}
$scope.uname=response.username;$scope.balance=response.balance})
$scope.logout=function(){$http.post('/logout').success(function(response){})}}])