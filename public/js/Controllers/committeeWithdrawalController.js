angular.module('Cafepay.Controllers')

.controller('committeeWithdrawalController',function($scope,$http){
	$scope.done = false;
	$scope.invalid = false;
	$scope.withdrawals
	
	$http.get('/committee/getwithdrawal').success(function(response){

		console.log("hmm")
		if(response.success)
			$scope.withdrawals = response.data;
	})


	$scope.approve = function(user){


		$http.post('/committee/approvewithdrawal',user).success(function(response){

			console.log(response)

			if(response.success){
				$scope.done = true;
				$scope.invalid = false;
			}
			else{
				$scope.done = false;
				$scope.invalid = true;
			}


		})
		
	}
})


