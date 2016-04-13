angular.module('Cafepay.Controllers')

.controller('customerHistoryController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/customer/getlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}


		//console.log(response)

	})
})
