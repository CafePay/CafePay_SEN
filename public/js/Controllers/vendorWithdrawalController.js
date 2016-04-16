angular.module('Cafepay.Controllers').controller('vendorWithdrawalController',["$scope","$http",function($scope,$http){$scope.done=!1;$scope.err=!1;$scope.valid=!1;$http.get('/vendor/getamount').success(function(response){$scope.balance=response.balance})
$scope.send=function(user){if(user.withdrawal<=0||(user.withdrawal%500!=0)){$scope.done=!1;$scope.err=!1;$scope.valid=!0;return}
else if($scope.balance<user.withdrawal){$scope.done=!1;$scope.err=!1;$scope.valid=!0;return}
$scope.balance=$scope.balance-user.withdrawal;console.log($scope.balance)
$scope.valid=!1;$http.post('/vendor/requestwithdrawal',user).success(function(response){$scope.done=!1;$scope.err=!1;console.log(response)
if(response.success==!0){$scope.done=!0;$scope.err=!1;console.log("hm1")
console.log($scope.done)
$http.get('/vendor/getamount').success(function(response){})}
if(response.success==!1){$scope.err=!0;$scope.done=!1;console.log("hm2")}})}
$scope.clear=function(){$scope.user={};$scope.done=!1;$scope.err=!1}}])