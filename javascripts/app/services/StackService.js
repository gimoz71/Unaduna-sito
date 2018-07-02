angular.module("applicationModule").service("stackService", function($http, $scope) {
	
	$scope.selectedAccessories = [];
	$scope.selectedModel = [];
	$scope.selectedSymbols = [];
	
	this.addAccessory = function(accessory){
		$scope.selectedAccessories.push(accessory);
	}
});