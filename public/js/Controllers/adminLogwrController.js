angular.module('Cafepay.Controllers')

.controller('adminLogwrController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/admin/getwrlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}


		//console.log(response)

	})
})
