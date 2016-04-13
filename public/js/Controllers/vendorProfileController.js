angular.module('Cafepay.Controllers')

.controller('vendorProfileController',function($scope,$http,$location,token,$rootScope){
	token.setnotoken(false);
	$scope.changebalance = function(data){
		console.log("hmmm")
		$scope.balance = data;
	}

	$scope.$on('balance',function(event,data){
		console.log( "parent.."+ data )
		$scope.balance = data.data;
	})

	$http.get('/vendor/profile').success(function(response){

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
				$scope.balance = response.balance;
				

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
