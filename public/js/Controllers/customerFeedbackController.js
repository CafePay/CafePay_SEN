angular.module('Cafepay.Controllers').controller('customerFeedbackController',["$scope","$http",function($scope,$http){$scope.recorded=!1;$scope.err=!1;$scope.invalid=!1;$scope.send=function(user){if(!user){$scope.invalid=!0;$scope.recorded=!1;$scope.err=!1;return}
else if(!user.feedback||!user.subject){$scope.invalid=!0;$scope.recorded=!1;$scope.err=!1;return}
$scope.invalid=!1;$http.post('/customer/sendfeedback',user).success(function(response){$scope.recorded=!1;$scope.err=!1;$scope.invalid=!1;console.log(response)
if(response.success==!0){$scope.recorded=!0;$scope.err=!1;$scope.invalid=!1;console.log("hm1")
console.log($scope.recorded)}
if(response.success==!1){$scope.err=!0;$scope.recorded=!1;$scope.invalid=!1;console.log("hm2")}})}
$scope.clear=function(){$scope.user={};$scope.recorded=!1;$scope.err=!1}}])