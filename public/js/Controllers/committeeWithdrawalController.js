angular.module('Cafepay.Controllers').controller('committeeWithdrawalController',["$scope","$http",function($scope,$http){$scope.done=!1;$scope.invalid=!1;$scope.withdrawals
$http.get('/committee/getwithdrawal').success(function(response){console.log("hmm")
if(response.success)
$scope.withdrawals=response.data})
$scope.approve=function(user){$http.post('/committee/approvewithdrawal',user).success(function(response){console.log(response)
if(response.success){$scope.done=!0;$scope.invalid=!1}
else{$scope.done=!1;$scope.invalid=!0}})}}])