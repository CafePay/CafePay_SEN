angular.module('custom.dir',[])
.directive('scanner',function($window,$rootScope){
	return {
		restrict : 'E',
		template :'<div id="reader" style="width:300px;height:250px"></div>',
		link: function(scope,element,attrs){
			
		$('#reader').html5_qrcode(function(data){
			console.log(data)
			$rootScope.$broadcast("ave",data);

				$('#read').html(data);
				var send = { hmac : data};

				$.post('/vendor/scanqrcode/hmac',send,function(response){
					console.log(response)
					if(response.message == "done"){	
						$('#scanned1').css("display", "block");
						$('#notvalid1').css("display", "none");
						setTimeout(function(){
							$('#scanned1').css("display", "none");
							$('#notvalid1').css("display", "none");
						},1500)
					}
					else if (response.message == "invalid"){										
						$('#scanned1').css("display", "none");
						$('#notvalid1').css("display", "block");											

						setTimeout(function(){
							$('#scanned1').css("display", "none");
							$('#notvalid1').css("display", "none");
						},1500)
					}
				})
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

