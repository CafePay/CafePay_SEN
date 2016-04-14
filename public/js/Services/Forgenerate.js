angular.module("Cafepay.Services")

.service("Forgenerate",function($http){

	var items = {};
	return{
			initializeCounter : function(){
				var counter = [];
				for( var i = 0 ;i < items.length;i++ )
					counter.push(0);
				return counter;
			},

			getitems : function(){
				$http.get('/api/itemlist').success(function(response){
					console.log(response)
					items = response.items;
					return items;
				});
			}
		}
})

