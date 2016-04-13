angular.module('Cafepay.Controllers')

.controller('vendorComplaintController',function($scope,$http){
	
	$scope.filed = false;
	$scope.err = false;
$scope.invalid = false;
	$scope.send = function(user){



	if(!user){
				$scope.invalid = true;
					$scope.filed = false;
					$scope.err = false;

				return;
			}
			else if (!user.complaint || !user.subject){
				$scope.invalid = true;
					$scope.filed = false;
					$scope.err = false;

				return;
			}
						$scope.invalid = false;
		$http.post('/vendor/sendcomplaint',user).success(function(response){
			$scope.filed = false;
			$scope.err = false;
			$scope.invalid = false;
				console.log(response)
				if(response.success == true){
					$scope.filed = true;
					$scope.err = false;
						$scope.invalid = false;
					console.log("hm1")
					console.log($scope.filed)
				}
				 if(response.success == false){
					$scope.err = true;
					$scope.filed = false;
						$scope.invalid = false;
					console.log("hm2")
				}
		})
	}
	$scope.clear = function(){

		$scope.user = {};
		$scope.filed = false;
		$scope.err = false;
	}



	
})
