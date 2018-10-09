angular.module("applicationModule").service("UtilFunctionMessagesCreator", function() {
	
	this.getTipiAccessoriMessage = function(modelName){
		var message = {};
		message.modello = modelName;
		
		return message;
	};
	
	this.putUtenteMessage = function(utente){
		var message = {};
		message.functionName = "UnaDunaPutUtente";
		message.utente = utente;
		return message;
	}
	
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
	
	this.getConfigurazioniMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioni";
		return message;
	}
	
	this.getConfigurazioniUtenteMessage = function(codiceUtente){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniUtente";
		message.codiceUtente = codiceUtente;
		return message;
	}
	
	this.getOrdiniMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetOrdini";
		return message;
	}
	
	this.getOrdiniUtenteMessage = function(codiceUtente){
		var message = {};
		message.functionName = "UnaDunaGetOrdiniUtente";
		message.codiceUtente = codiceUtente;
		return message;
	}
	
	this.getOrdineMessage = function(codiceOrdine){
		var message = {};
		message.functionName = "UnaDunaGetOrdine";
		message.codiceOrdine = codiceOrdine;
		return message;
	}
	
	this.getConfigurazioneMessage = function(codiceConfigurazione){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazione";
		message.codiceConfigurazione = codiceConfigurazione;
		return message;
	}

	this.putConfigurazioneMessage = function(configurazione){
		var message = {};
		message.functionName = "UnaDunaPutConfigurazione";
		message.configurazione = configurazione;
		return message;
	}
	
	this.putOrdineMessage = function(ordine){
		var message = {};
		message.functionName = "UnaDunaPutOrdine";
		message.ordine = ordine;
		return message;
	}
	
	this.deleteConfigurazioneMessage = function(configurazione){
		var message = {};
		message.functionName = "UnaDunaDeleteConfigurazione";
		message.codiceConfigurazione = configurazione;
		return message;
	}
	
	this.deleteOrdineMessage = function(ordine){
		var message = {};
		message.functionName = "UnaDunaDeleteOrdine";
		message.codiceOrdine = ordine;
		return message;
	}
});