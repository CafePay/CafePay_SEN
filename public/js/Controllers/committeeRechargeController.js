angular.module('Cafepay.Controllers').controller('committeeRechargeController',["$scope","$http",function($scope,$http){$scope.done=!1;$scope.invalid=!1;$scope.recharges={};$http.get('/committee/getrecharge').success(function(response){console.log(response.data)
$scope.recharges=response.data;console.log($scope.recharges)})
$scope.approve=function(user){$http.post('/committee/approverecharge',user).success(function(response){console.log(response)
if(response.success){$scope.done=!0;$scope.invalid=!1}
else{$scope.done=!1;$scope.invalid=!0}})}}])