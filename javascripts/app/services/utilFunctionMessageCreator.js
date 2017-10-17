angular.module("applicationModule").service("UtilFunctionMessagesCreator", function() {
	
	this.getTipiAccessoriMessage = function(modelName){
		var message = {};
		message.modello = modelName;
		
		return message;
	};
});