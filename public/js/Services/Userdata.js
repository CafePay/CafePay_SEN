angular.module('Cafepay.Services')

.service("Loggeduser",function(){
	var user={};
	return{
		setuser : function(data){
				this.user = data;
		},
		getamount : function(){
				return user.amount;
		},
		setamount : function(money){
				this.user.amount = money;
		}
	}
})