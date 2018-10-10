angular.module("loginModule").service("getOrdiniService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(mail){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.getOrdiniUtenteMessage(mail);
		
		return $http.post(URLS.get, message, config);
	}
}]);