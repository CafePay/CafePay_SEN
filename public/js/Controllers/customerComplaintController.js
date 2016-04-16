angular.module('Cafepay.Controllers').controller('customerComplaintController',["$scope","$http",function($scope,$http){$scope.filed=!1;$scope.err=!1;$scope.invalid=!1;$scope.send=function(user){if(!user){$scope.invalid=!0;$scope.filed=!1;$scope.err=!1;return}
else if(!user.complaint||!user.subject){$scope.invalid=!0;$scope.filed=!1;$scope.err=!1;return}
$scope.invalid=!1;console.log(user)
$http.post('/customer/sendcomplaint',user).success(function(response){$scope.filed=!1;$scope.err=!1;$scope.invalid=!1;console.log(response)
if(response.success==!0){$scope.filed=!0;$scope.err=!1;$scope.invalid=!1;console.log($scope.filed)}
if(response.success==!1){$scope.err=!0;$scope.filed=!1;$scope.invalid=!1}})}
$scope.clear=function(){$scope.user={};$scope.filed=!1;$scope.err=!1}}])