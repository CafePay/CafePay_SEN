angular.module('Cafepay.Controllers')

.controller('committeeRechargeController',function($scope,$http){

	$scope.recharges = {};

	console.log("acve 6")
	$http.get('/committee/getrecharge').success(function(response){

		console.log("ayaa bb")

		console.log(response.data)
		$scope.recharges = response.data;
		console.log($scope.recharges)
	})


	$scope.approve = function(user){



		$http.post('/committee/approverecharge',user).success(function(response){

			console.log(response)



		})

	}







	
})
