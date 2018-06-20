angular.module("applicationModule").service("listeService", ["$http",  "UtilFunctionMessagesCreator", function($http, $scope, UtilFunctionMessagesCreator) {
	
	$scope.urlGetService = "https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet"
	
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
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getAccessori = function(){
		var requestMessage = UtilFunctionMessagesCreator.getAccessoriMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getConfigurazione = function(codiceConfigurazione){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioneMessage(codiceConfigurazione);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getConfigurazioni = function(){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getConfigurazioniUtente = function(codiceUtente){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getOrdini = function(codiceOrdine){
		var requestMessage = UtilFunctionMessagesCreator.getOrdineMessage(codiceOrdine);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getOrdini = function(){
		var requestMessage = UtilFunctionMessagesCreator.getOrdiniMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.getOrdiniUtente = function(codiceUtente){
		var requestMessage = UtilFunctionMessagesCreator.getOrdiniUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.putConfigurazione = function(configurazione){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioneMessage(configurazione);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
	
	this.putOrdine = function(ordine){
		var requestMessage = UtilFunctionMessagesCreator.getOrdineMessage(ordine);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post($scope.urlGetService, requestMessage, config);
	}
}]);