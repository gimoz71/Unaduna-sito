angular.module("applicationModule").controller("componentsController", function($scope) {
  
	$scope.isHome = true;
	$scope.isConfigurator = false;
	$scope.isVisione = false;
	$scope.isEsperienza = false;
	$scope.isContatti = false;
	$scope.isStores = false;
	
	$scope.wowInit = function(config){
		if(config){
			new WOW(config).init();
		} else {
			new WOW().init();
		}
		
	}
	
	$scope.init = function(){
		$scope.wowInit();
	}
	
	$scope.setHome = function(){
		$scope.isHome = true;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.wowInit({
		    boxClass: 'home-content wow'
		})
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
		$scope.wowInit()
	};
	
	$scope.setEsperienza = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = true;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.wowInit()
	};
	
	$scope.setContatti = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = true;
		$scope.isStores = false;
		$scope.wowInit()
	};
	
	$scope.setStores = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = true;
		$scope.wowInit()
	};
	
})