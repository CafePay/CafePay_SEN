//Admin profile controller =========================================
	angular.module('Cafepay.Controllers')

	.controller('adminProfileController',function($scope,$http,$location,token){
		token.setnotoken(false);

		$http.get('/admin/profile').success(function(response){

			console.log(response);
			
			if(response.err == "notoken"){
				token.setnotoken(true);
				$location.path("/login");
			}
			else if(response.err == "forbidden"){
				$location.path("/forbidden")
			}
			$scope.uname = response.username;

		})
	$scope.logout = function(){
				$http.post('/logout').success(function(response){
		})
	}
	})
