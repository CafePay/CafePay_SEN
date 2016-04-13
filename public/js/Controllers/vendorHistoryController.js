angular.module('Cafepay.Controllers')

.controller('vendorHistoryController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/vendor/getlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}


		//console.log(response)

	})
})
