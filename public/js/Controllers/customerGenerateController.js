angular.module('Cafepay.Controllers')

.controller('customerGenerateController',function($scope,$http){
	
	$http.get('/customer/getamount').success(function(response){

					//console.log(response)
					$scope.dummy = response.amount;
					console.log(response)
					
	});
	$scope.total = 0;
	$scope.counter = [];


	$http.get('/api/itemlist').success(function(response){

					console.log(response)
					$scope.items = response.items;

					for( var i = 0 ;i < $scope.items.length;i++ )
						$scope.counter.push(0);
					
	});
	//console.log($scope.items);
	
	$scope.add = function(index){
		$scope.counter[index]++;
		$scope.total = $scope.total + $scope.items[index].price;

		//console.log($scope.total)
	};

	$scope.delete = function(index){


			$scope.counter[index]--;
			$scope.total = $scope.total - $scope.items[index].price;
		
		//console.log($scope.total)
	};

	$scope.purchase = function(){

		purchasedata = [];
		var j=0;
		for(var i=0; i < $scope.items.length;i++){

			if($scope.counter[i] != 0){
				purchasedata[j] = {};
				purchasedata[j]._id=($scope.items[i]._id);
				//delete purchasedata[i].available_at;
				purchasedata[j].quantity = $scope.counter[i];
				j++;
			}
		}

		$http.post("/customer/generate-qr-code",purchasedata,function(response){
				//console.log(response)

				$scope.dummy = response.amount;
		})

	}


	
})
