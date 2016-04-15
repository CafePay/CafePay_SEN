angular.module('Cafepay.Controllers')

.controller('adminLogController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/admin/getlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}

	})
})
