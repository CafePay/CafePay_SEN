angular.module('Cafepay.Controllers')

.controller('ChangepasswordController',function($scope,$http){
	

	$scope.changed = false;
	$scope.err = false;

	$scope.send = function(user){




		$http.post('/customer/changepassword',user).success(function(response){
			$scope.changed = false;
			$scope.err = false;
				console.log(response)
				if(response.success == true){
					$scope.changed = true;
					$scope.err = false;
					console.log("hm1")
					console.log($scope.changed)
				}
				 if(response.success == false){
					$scope.err = true;
					$scope.changed = false;
					console.log("hm2")
				}
		})
	}
	$scope.clear = function(){

		$scope.user = {};
		$scope.changed = false;
		$scope.err = false;
	}
	
})
