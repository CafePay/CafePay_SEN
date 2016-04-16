angular.module('Cafepay.Controllers').controller('customerGenerateController',["$scope","$http",function($scope,$http){$http.get('/customer/getamount').success(function(response){$scope.dummy=response.balance;console.log(response)});$scope.done=!1;console.log($scope.dummy)
$scope.total=0;$scope.counter=[];$http.get('/api/itemlist').success(function(response){console.log(response)
$scope.items=response.items;$scope.items.sort(function(a,b){if(a.name>b.name)
return 1;else return-1})
for(var i=0;i<$scope.items.length;i++)
$scope.counter.push(0);});$scope.add=function(index){$scope.done=!1;$scope.counter[index]++;$scope.total=$scope.total+$scope.items[index].price};$scope.delete=function(index){$scope.done=!1;$scope.counter[index]--;$scope.total=$scope.total-$scope.items[index].price};$scope.purchase=function(){purchasedata=[];var j=0;for(var i=0;i<$scope.items.length;i++){if($scope.counter[i]!=0){purchasedata[j]={};purchasedata[j]._id=($scope.items[i]._id);purchasedata[j].quantity=$scope.counter[i];j++}}
$http.post("/customer/generate-qr-code",purchasedata).success(function(response){console.log(response)
if(response.success){$scope.done=!0;$scope.$emit('balance',{data:response.balance})
$scope.dummy=response.balance;$scope.total=0;console.log($scope.dummy)
for(var i=0;i<$scope.items.length;i++)
$scope.counter[i]=0}})}}]);