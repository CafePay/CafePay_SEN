angular.module('custom.dir',[])
.directive('scanner',function($window,$rootScope){








	return {
		restrict : 'E',
		template :'<div id="reader" style="width:300px;height:250px"></div>',
		link: function(scope,element,attrs){
			console.log("jay 6")
						//var count = null;
						$('#reader').html5_qrcode(function(data){
									console.log(data)
									//$('#reader').remove();
									$rootScope.$broadcast("ave",data);

									$('#read').html(data);
									var send = { hmac : data/*"32bb6f357ce96f51c6c1cc5441210294c0c225ad793947183575ff732af5c809"*/};
									//if(count){
									///	count = false;
									$.post('/vendor/scanqrcode/hmac',send,function(response){
										console.log(response)
										//count = true;
									


										if(response.message == "done"){

											
												$('#scanned1').css("display", "block");
												$('#notvalid1').css("display", "none");
											

											setTimeout(function(){
													$('#scanned1').css("display", "none");
												$('#notvalid1').css("display", "none");
												},1500)

											//$scope.done = true;
											//$scope.invalid  = false;
											//$rootScope.$broadcast('balance', {data :response.balance})
											//console.log("hare")
											//$scope.$emit('balance',{data : response.balance})
											//console.log(response.balance)
											

										}
										else if (response.message == "invalid"){

											

												$('#scanned1').css("display", "none");
												$('#notvalid1').css("display", "block");

											

											setTimeout(function(){
													$('#scanned1').css("display", "none");
												$('#notvalid1').css("display", "none");
												},1500)
											
											//$scope.done = false;
											//$scope.invalid  = true;
										}
										/*setTimeout(function(){
										console.log("oho")
									},5000)*/
									})

									
									
							//	}
								},
								function(error){
									$('#read_error').html(error);
								}, function(videoError){
									$('#vid_error').html(videoError);
								}
							);



		}
	}




})

