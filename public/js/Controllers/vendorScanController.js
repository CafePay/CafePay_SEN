angular.module('Cafepay.Controllers')

.controller('vendorScanController',function($scope,$http,$location,$rootScope,token){
	$scope.done = false;
	$scope.invalid  = false;
		$scope.send = function(user){
			if($scope.user.id.length > 0){
			$http.post('/vendor/scanqrcode/shortid',user).success(function(response){

					console.log("nare")
				if(response.message == "done"){
					$scope.done = true;
					$scope.invalid  = false;
					//$rootScope.$broadcast('balance', {data :response.balance})
					console.log("hare")
					$scope.$emit('balance',{data : response.balance})
					console.log(response.balance)
					

				}
				else if (response.message == "invalid"){
					$scope.done = false;
					$scope.invalid  = true;
				}
			})

			

			}
		}
	
	
})

