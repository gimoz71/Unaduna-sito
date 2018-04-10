angular.module("applicationModule").service("getEntitiesService", ["$http",  "UtilFunctionMessagesCreator", "VARIOUS", function($http, UtilFunctionMessagesCreator, VARIOUS) {
	
	this.response = function(string type){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		
		if(type.equals(VARIOUS.)){
			
		}
		return $http.post(URLS.get, getMessagesCreator.genericMessage('getAziendeGen'), config);
	}
}]);