angular.module('Cafepay.Controllers')

.controller('customerLogwrController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/customer/getwrlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}


		//console.log(response)

	})
})
