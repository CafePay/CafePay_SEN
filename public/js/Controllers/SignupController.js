angular.module('Cafepay.Controllers')

.controller('SignupController',function($scope,$http){
      $scope.registered = false;
			$scope.user={};
			$scope.user.account = "customer";
	        $scope.send = function(user){


            $http.post('/signup',user).success(function(response){
                    $scope.registered = false;
                    console.log(response);
                    
                    if(response.err ==='emailtaken')
                        {
                          $scope.emailtaken = true;

                          $scope.usernametaken = false;
                        //  debugger;
                          //console.log($scope.nouser+' '+$scope.nopassword )
                        }
                        else if(response.err ==='usernametaken'){

                          $scope.usernametaken = true;
                          $scope.emailtaken = false;
                        }
                   	if(response.success){
                   			console.log(response)

                        $scope.registered = true;
                   			//login(user);

                   	}		
                    

            });


            
        }
      




	
})
