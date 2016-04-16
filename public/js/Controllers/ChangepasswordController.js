angular.module('Cafepay.Controllers').controller('ChangepasswordController',["$scope","$http",function($scope,$http){$scope.changed=!1;$scope.err=!1;$scope.send=function(user){$http.post('/customer/changepassword',user).success(function(response){$scope.changed=!1;$scope.err=!1;console.log(response)
if(response.success==!0){$scope.changed=!0;$scope.err=!1;console.log("hm1")
console.log($scope.changed)}
if(response.success==!1){$scope.err=!0;$scope.changed=!1;console.log("hm2")}})}
$scope.clear=function(){$scope.user={};$scope.changed=!1;$scope.err=!1}}])