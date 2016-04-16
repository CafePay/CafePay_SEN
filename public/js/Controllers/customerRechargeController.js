angular.module('Cafepay.Controllers').controller('customerRechargeController',["$scope","$http",function($scope,$http){$scope.done=!1;$scope.err=!1;$scope.invalid=!1;$scope.send=function(user){if(!user){$scope.invalid=!0;$scope.done=!1;$scope.err=!1;return}
else if(user.recharge<=0||user.recharge>5000||(user.recharge%500!=0)){$scope.invalid=!0;$scope.done=!1;$scope.err=!1;return}
$http.post('/customer/requestrecharge',user).success(function(response){$scope.done=!1;$scope.err=!1;console.log(response)
if(response.success==!0){$scope.done=!0;$scope.err=!1;$scope.invalid=!1;console.log("hm1")
console.log($scope.done)}
if(response.success==!1){$scope.err=!0;$scope.done=!1;$scope.invalid=!1;console.log("hm2")}})}
$scope.clear=function(){$scope.user={};$scope.done=!1;$scope.err=!1}}])