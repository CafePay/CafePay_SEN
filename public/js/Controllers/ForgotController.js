angular.module('Cafepay.Controllers')

.controller('ForgotController',function($scope,$http){
      $scope.done = false;
      $scope.nouser = false;
		
	        $scope.send = function(user){


            $http.post('/forgot',user).success(function(response){
                    $scope.done = false;
                    $scope.nouser = false;
                    console.log(response);
                    
                    if(response.err ==='nouser')
                        {
                          $scope.nouser = true;


                        
                        }
                       
                   	if(response.success){
                   			

                        $scope.done = true;
                   			//login(user);

                   	}		
                    

            });


            
        }
      




	
})
