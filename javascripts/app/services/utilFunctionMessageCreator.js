angular.module("applicationModule").service("UtilFunctionMessagesCreator", function() {
	
	this.getTipiAccessoriMessage = function(modelName){
		var message = {};
		message.modello = modelName;
		
		return message;
	};
	
	
	this.getModelliMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetModelli";
		return message;
	}
	
	this.getAccessoriMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetAccessori";
		return message;
	}
});