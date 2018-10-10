angular.module("loginModule").controller("ordiniController", ["$scope", "loginService", "getOrdiniService", function($scope, loginService, getOrdiniService) {
	
$scope.listaOrdini = [];
	
loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a["Name"] == "email" ){
					codice = a["Value"];
					console.log(codice);
					getOrdiniService.response(codice).then(function(data){
						$scope.listaOrdini = data.data.ordini;
						console.log(data);
						console.log ($scope.listaOrdini );
						
					})
				}
			})
		},
		function (reason){
			console.log(reason)
		}
)	
	
}]);
