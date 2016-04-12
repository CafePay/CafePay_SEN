angular.module('Cafepay.Controllers')

.controller('customerMyqrController',function($scope,$http,QRs,$rootScope,$window){
	
	$scope.codes={};
	$scope.read = false;
	$scope.loading = true;
	$http.get('/customer/myqrcodes').success(function(response){

		
		if(response.success){
			$scope.codes = response.data;
			$scope.read = true;
			$scope.loading = false;
		}


		//console.log(response)

	})

	//$scope.codes = QRs.getqrcodes();
	//console.log(QRs.getqrcodes())
	
	//console.log($scope.codes);
	//console.log($scope.codes[0].hmac)
	
	
	
	

	//console.log(co)
})
