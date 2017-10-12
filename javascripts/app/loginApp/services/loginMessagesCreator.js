angular.module("loginModule").service("LoginMessagesCreator", function() {
	
	this.loginMessage = function(username, password){
		var message = {};
		message.operation = "login";
		message.dominio = "unaduna";
		message.username = username;
		message.password = password;
		
		return message;
	};
	
//	this.creatorService.registerMessage = function(username, password){
//		var message = {};
//		message.op = "register";
//		message.username = username;
//		message.password = password;
//		message.email = '';
//		
//		return message;
//	};
//	
//	this.creatorService.logoutMessage = function(username){
//		var message = {};
//		message.op = "logout";
//		message.username = username;
//		
//		return message;
//	};
});