angular.module('Cafepay.Controllers')

.controller('ProfileController',function($scope,$http,$location,token){
	token.setnotoken(false);

	$http.get('/customer/profile').success(function(response){

		//$scope.message = response;
		console.log(response);
		
		if(response.err == "notoken"){
			token.setnotoken(true);
			$location.path("/login");
		}
		/*if(message == err)
			$location.path('/')*/
	})
$scope.logout = function(){
	console.log("haaa")

	$http.post('/logout').success(function(response){

		console.log(response)
	})
}



	
})
