angular.module("loginModule").controller("accessoController", ["$scope", "loginService", "salvaUtenteService", function($scope, loginService, salvaUtenteService) {
	
//	loginService.setDeviceStatusRemembered().then(
//			function(greeting) {
//			  console.log('Success: ' + greeting);
//			}, function(reason) {
//			  console.log('Failed: ' + reason);
//			});
	
	$scope.remember = {
		       value : true,
		     };
	
	$scope.login = function (email, password){
		console.log("eccomi controller");
		loginService.login(email, password).then(
			function(data){
				console.log($scope.remember);
					loginService.getCurrentUser().then (function (data){
						console.log(data);
						$scope.setUser(data);
						if ($scope.remember.value == true){
							loginService.setDeviceStatusRemembered().then(
									function(greeting) {
									  console.log('Success: remembered ' + greeting);
									}, function(reason) {
									  console.log('Failed: ' + reason);
									});
						}else{
							loginService.setDeviceStatusNotRemembered().then(
									function(greeting) {
									  console.log('Success: not remembered ' + greeting);
									}, function(reason) {
									  console.log('Failed: ' + reason);
									});
						}
					})
				$scope.setHome();
			}, function(reason) {
				  console.log( reason);
				  alert (reason.message);
			}
		);
		
	}
	
	$scope.signUp = function (email, nome, cognome, password){
		loginService.signUp(email, nome, cognome, password).then(
				function(data){
					console.log(data);
					utente = {};
					utente.email = email;
					utente.username = nome + "-" +cognome;
					utente.nome = nome;
					utente.cognome = cognome;
//					salvaUtenteService.response (utente).then(
//							function(r){
//								console.log(utente);
//								console.log(r);
//							}
//					)
					$scope.setHome();
				},
				function (reason){
					console.log(reason);
				}
		);
	}
	
	
}]);
