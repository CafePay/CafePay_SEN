angular.module('Cafepay.Controllers')

.controller('vendorLogwrController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/vendor/getwrlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}


		//console.log(response)

	})
})
