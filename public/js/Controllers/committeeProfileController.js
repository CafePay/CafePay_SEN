//Committee profile controller =======================================================
angular.module('Cafepay.Controllers')

.controller('committeeProfileController',function($scope,$http,$location,token){
	token.setnotoken(false);
	$scope.uname;
	$http.get('/committee/profile').success(function(response){

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
