angular.module('Cafepay.Controllers')

.controller('SignupController',function($scope,$http){
      $scope.registered = false;
      $scope.valid = false;
			$scope.user={};
			$scope.user.account = "customer";
	        $scope.send = function(user){

              var check = $scope.user.username.substr(0,4);
              if((check != "2012" && check != "2013" && check != "2014" && check != "2015" ) || $scope.user.username.length != 9){

                 console.log(check)
                 $scope.valid = true;
                 return;
            
              }
              $scope.valid = false;
              //console.log($scope.user.username.substr(0,4))
              //return;
              $scope.user.email = $scope.user.username  + "@daiict.ac.in";

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


            
        }
      




	
)
