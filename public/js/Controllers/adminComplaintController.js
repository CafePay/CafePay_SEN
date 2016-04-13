angular.module('Cafepay.Controllers')

.controller('adminComplaintController',function($scope,$http){
	console.log("hi")
	$scope.logs = {};

	$http.get('/admin/getcomplaint').success(function(response){

		
		if(response.success){
			$scope.complaints = response.data;
			console.log(response.data)
		}


		console.log(response)

	})
})
