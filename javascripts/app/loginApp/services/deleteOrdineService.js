angular.module("loginModule").service("deleteOrdineService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(cod){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.deleteOrdineMessage(cod);
		
		return $http.post(URLS.del, message, config);
	}
}]);