angular.module('Cafepay.Controllers')

.controller('LoginController',function($scope,$http,$location,token,$state){

  $scope.notoken = token.getnotoken();
	

  $scope.send = function(user){
            console.log(user);
            $http.post('/login',user).success(function(response){

                        console.log(response)

                        //$scope.err = response.err;

                        if(response.err ==='nouser')
                        {
                          $scope.nouser = true;

                          $scope.nopassword = false;
                        //  debugger;
                          //console.log($scope.nouser+' '+$scope.nopassword )
                        }
                        else if(response.err ==='nopassword'){

                          $scope.nopassword = true;
                          $scope.nouser = false;
                        }
                    if(response.success == true){

                           /* shared.settoken(response.token);
                            shared.setcuruser(response.user);
                            shared.setloggedin(true);*/
                          //  console.log(shared.gettoken())
                         //   console.log(shared.getcuruser())
                         //   console.log(shared.getloggedin())
                         	
                           // debugger
                            if(response.user.account == "customer")
                                $state.go("customer")
                            else if(response.user.account == "vendor")
                                $state.go("vendor")
                             else if(response.user.account == "admin")
                                $state.go("admin")  
                               else if(response.user.account == "committee")
                                $state.go("committee")  
                            

                   }




            })
        };



	
})