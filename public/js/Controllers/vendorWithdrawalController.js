angular.module('Cafepay.Controllers')

.controller('vendorWithdrawalController',function($scope,$http){
	
	$scope.done = false;
	$scope.err = false;

	$scope.send = function(user){




		$http.post('/vendor/requestwithdrawal',user).success(function(response){
			$scope.done = false;
			$scope.err = false;
				console.log(response)
				if(response.success == true){
					$scope.done = true;
					$scope.err = false;
					console.log("hm1")
					console.log($scope.done)

				}
				 if(response.success == false){
					$scope.err = true;
					$scope.done = false;
					console.log("hm2")
				}
		})
	}
	$scope.clear = function(){

		$scope.user = {};
		$scope.done = false;
		$scope.err = false;
	}




	
})
