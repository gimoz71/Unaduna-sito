angular.module("loginModule").service("deleteConfigurazioneService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(cod){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.deleteConfigurazioneMessage(cod);
		
		return $http.post(URLS.del, message, config);
	}
}]);