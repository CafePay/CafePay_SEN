angular.module('Cafepay.Controllers').controller('vendorScanController',["$scope","$http","$location","$rootScope","token",function($scope,$http,$location,$rootScope,token){$scope.done=!1;$scope.invalid=!1;$scope.send=function(user){if($scope.user.id.length>0){$http.post('/vendor/scanqrcode/shortid',user).success(function(response){$scope.done=!1;$scope.invalid=!1;console.log("nare")
if(response.message=="done"){$scope.done=!0;$scope.invalid=!1;setTimeout(function(){$scope.done=!1;$scope.invalid=!1},1500)
console.log("hare")
$scope.$emit('balance',{data:response.balance})
console.log(response.balance)}
else if(response.message=="invalid"){console.log("hm")
$scope.done=!1;$scope.invalid=!0;setTimeout(function(){$scope.done=!1;$scope.invalid=!1},1500)}})}}}])