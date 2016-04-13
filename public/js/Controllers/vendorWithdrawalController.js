angular.module('Cafepay.Controllers')

.controller('vendorWithdrawalController',function($scope,$http){
	
	$scope.done = false;
	$scope.err = false;
	$scope.valid = false;
	$http.get('/vendor/getamount').success(function(response){

		$scope.balance = response.balance;
	})


	$scope.send = function(user){



		if($scope.balance < user.withdrawal){
			$scope.done = false;
		$scope.err = false;
			$scope.valid = true;
			return;
		}

		$scope.balance = $scope.balance - user.withdrawal;
						console.log($scope.balance)
	
		
		$scope.valid = false;
		$http.post('/vendor/requestwithdrawal',user).success(function(response){
			$scope.done = false;
			$scope.err = false;
				console.log(response)
				if(response.success == true){
					$scope.done = true;
					$scope.err = false;
					console.log("hm1")
					console.log($scope.done)
					$http.get('/vendor/getamount').success(function(response){


					})

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
