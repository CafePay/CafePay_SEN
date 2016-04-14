angular.module('Cafepay.Services', [])

.service("token",function(){
   var notoken = false;
   var balance
	return {
		setnotoken : function(data){
			notoken = data;
		},
		getnotoken : function(){
			return notoken;
		},
      setbalance : function(data){
         balance  = data;
      },
      gettbalance : function(){
         return balance;
      }
	}
})

.service("custom",function(){
   var image;
   return {

         setimage : function(data){
               image = data;
               console.log(image)
         },
         getimage : function(){
            return image;
         }
    }
})


.service("QRs",function(){
   codes = [{"shortid":"VJv6LxMkZ","hmac":"2bc755ad8392116031d60c6371dd00e5511935bf6e79aa2a9999ad0c5649ec83"
},{"shortid":"Vyxw68eG1W","hmac":"4bc49668c6b97bdef537a83a734c6f564f76c9b716c3b69ba46ccb86852f90fd"}
,{"shortid":"NJWwpUxMJW","hmac":"f59b7156e711a59760f49a90b4ae352048fbf581bc02c112d0320b2689781fa7"}]
   
   return {
      getqrcodes : function(){
   			return codes;
   	}
   		
   }
})