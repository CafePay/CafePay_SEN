angular.module('Cafepay.Controllers')

.controller('customerRechargeController',function($scope,$http){
    
    $scope.done = false;
    $scope.err = false;
    $scope.invalid = false;
    $scope.send = function(user){


   	 if(!user){
   		 $scope.invalid = true;
   		 $scope.done = false;
   		 $scope.err = false;
   		 return;
   	 }
   	 else if(user.recharge <=0 || user.recharge > 5000 || (user.recharge % 500 != 0)){

   		 $scope.invalid = true;
   		 $scope.done = false;
   		 $scope.err = false;
   		 return;

   	 }


   	 $http.post('/customer/requestrecharge',user).success(function(response){
   		 $scope.done = false;
   		 $scope.err = false;
   			 console.log(response)
   			 if(response.success == true){
   				 $scope.done = true;
   				 $scope.err = false;
   				 $scope.invalid = false;
   				 console.log("hm1")
   				 console.log($scope.done)

   			 }
   			  if(response.success == false){
   				 $scope.err = true;
   				 $scope.done = false;
   				 $scope.invalid = false;
   				 console.log("hm2")
   			 }
   	 })
    }
    $scope.clear = function(){

   	 $scope.user = {};
   	 $scope.done = false;
   	 $scope.err = false;
    }




    
})



