angular.module("loginModule").controller("preferitiController", ["$scope", "getConfigurazioniService", "loginService",
	function($scope, getConfigurazioniService, loginService) {

	$scope.listaPreferiti = [];
loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a["Name"] == "email" ){
					codice = a["Value"];
					console.log(codice);
					getConfigurazioniService.response(codice).then(function(data){
						$scope.listaPreferiti = data.data.configurazioni;
						console.log(data);
						console.log ($scope.listaPreferiti );
						
					})
				}
			})
		},
		function (reason){
			console.log(reason)
		}
)	
	
}]);
