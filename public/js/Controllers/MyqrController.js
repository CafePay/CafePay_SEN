angular.module('Cafepay.Controllers')

.controller('MyqrController',function($scope,$http,QRs){
	

	$scope.codes = QRs.getqrcodes();
	//console.log(QRs.getqrcodes())

		console.log("hi")
	//console.log($scope.codes);
	console.log($scope.codes[0].hmac)
	
	

	//console.log(co)
})
