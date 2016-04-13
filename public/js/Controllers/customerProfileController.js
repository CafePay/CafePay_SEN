angular.module('Cafepay.Controllers')

.controller('customerProfileController',function($scope,$http,$location,token){
	token.setnotoken(false);

	$scope.$on('balance',function(event,data){
		$scope.balance = data.data;
	})

	$http.get('/customer/profile').success(function(response){

		//$scope.message = response;
		console.log(response);
		
		if(response.err == "notoken"){
			token.setnotoken(true);
			$location.path("/login");
		}
		else if(response.err == "forbidden"){
			$location.path("/forbidden")
		}

				$scope.uname = response.username;
				$scope.balance = response.balance
		/*if(message == err)
			$location.path('/')*/
	})
$scope.logout = function(){
	//console.log("haaa")

	$http.post('/logout').success(function(response){

		//console.log(response)
	})
}



	
})
