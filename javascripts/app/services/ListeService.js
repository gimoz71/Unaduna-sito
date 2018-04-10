angular.module("applicationModule").service("listeService", ["$http",  "UtilFunctionMessagesCreator", function($http, UtilFunctionMessagesCreator) {
	
	this.tipiAccessoriList = [];
	this.accessoriesList = [];
	
	this.addAccessories = function(newObj) {
		accessoriesList.push(newObj);
	};
	
	this.addAllAccessories = function(data){
		accessoriesList = data;
	};
	
	this.getTipiAccessoriRemote = function(modelName){
		//parametri di chiamata
		var data = UtilFunctionMessagesCreator.getTipiAccessoriMessage(modelName);
		
		//configurazioni di chiamata
		var config = {
		      headers : {
		          'Content-Type': 'application/json'
		      }
		  };
			  
		//GESTIRE CASO DI ERRORE
	    $http.post("https://tnpklinhf1.execute-api.eu-central-1.amazonaws.com/util_function_stage", data, config).then(function (res) {
	    	 	this.tipiAccessoriList = res.data.accessori;
	    });
	}
	
	this.getModelli = function(){
		var requestMessage = UtilFunctionMessagesCreator.getModelliMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post("https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet", requestMessage, config);
	}
	
	this.getAccessori = function(){
		var requestMessage = UtilFunctionMessagesCreator.getAccessoriMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post("https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet", requestMessage, config);
	}
}]);