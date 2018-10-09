angular.module("loginModule").service("getConfigurazioniService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(mail){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.getConfigurazioniUtenteMessage(mail);
		
		return $http.post(URLS.getConfigurazioniNode, message, config);
	}
}]);