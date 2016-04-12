angular.module('Cafepay.Controllers')

.controller('FeedbackController',function($scope,$http){
	

	$scope.recorded = false;
	$scope.err = false;

	$scope.send = function(user){




		$http.post('/customer/sendfeedback',user).success(function(response){
			$scope.recorded = false;
			$scope.err = false;
				console.log(response)
				if(response.success == true){
					$scope.recorded = true;
					$scope.err = false;
					console.log("hm1")
					console.log($scope.recorded)
				}
				 if(response.success == false){
					$scope.err = true;
					$scope.recorded = false;
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
