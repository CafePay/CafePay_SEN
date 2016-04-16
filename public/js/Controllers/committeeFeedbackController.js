angular.module('Cafepay.Controllers').controller('committeeFeedbackController',["$scope","$http",function($scope,$http){console.log("hi")
$scope.logs={};$http.get('/committee/getfeedback').success(function(response){if(response.success){$scope.feedbacks=response.data;console.log(response.data)}
console.log(response)})}])