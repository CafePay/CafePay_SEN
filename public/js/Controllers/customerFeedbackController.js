angular.module('Cafepay.Controllers')

.controller('customerFeedbackController',function($scope,$http){
	

	$scope.recorded = false;
	$scope.err = false;
	$scope.invalid = false;
	$scope.send = function(user){


			if(!user){
				$scope.invalid = true;

				$scope.recorded = false;
				$scope.err = false;
				return;
			}
			else if (!user.feedback || !user.subject){
				$scope.invalid = true;
				
				$scope.recorded = false;
				$scope.err = false;
				return;
			}
			$scope.invalid = false;	
		$http.post('/customer/sendfeedback',user).success(function(response){
			$scope.recorded = false;
			$scope.err = false;
			$scope.invalid = false;
				console.log(response)
				if(response.success == true){
					$scope.recorded = true;
					$scope.err = false;
					$scope.invalid = false;
					console.log("hm1")
					console.log($scope.recorded)
				}
				 if(response.success == false){
					$scope.err = true;
					$scope.recorded = false;
					$scope.invalid = false;
					console.log("hm2")
				}
		})
	}
	$scope.clear = function(){

		$scope.user = {};
		$scope.recorded = false;
		$scope.err = false;
	}


	
})
