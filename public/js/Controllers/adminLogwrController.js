// Log of recharge and withdrawal controller =======================================
angular.module('Cafepay.Controllers')

.controller('adminLogwrController',function($scope,$http){
	$scope.logs = {};

	$http.get('/admin/getwrlogs').success(function(response){

		
		if(response.success){
			$scope.logs = response.data;
			console.log(response.data)
		}
	})
})
