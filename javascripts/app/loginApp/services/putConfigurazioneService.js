angular.module("loginModule").service("putConfigurazioneService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(conf){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.putConfigurazioneMessage(conf)
		
		return $http.post(URLS.put, message, config);
	}
}]);