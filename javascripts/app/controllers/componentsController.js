angular.module("applicationModule").controller("componentsController", function($scope) {
  
	$scope.isHome = true;
	$scope.isConfigurator = false;
	$scope.isVisione = false;
	$scope.isEsperienza = false;
	$scope.isContatti = false;
	$scope.isStores = false;
	
	$scope.setHome = function(){
		$scope.isHome = true;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
	};
	
	$scope.setConfigurator = function(){
		$scope.isHome = false;
		$scope.isConfigurator = true;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
	};
	
	$scope.setVisione = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = true;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
	};
	
	$scope.setEsperienza = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = true;
		$scope.isContatti = false;
		$scope.isStores = false;
	};
	
	$scope.setContatti = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = true;
		$scope.isStores = false;
	};
	
	$scope.setStores = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = true;
	};
	
})