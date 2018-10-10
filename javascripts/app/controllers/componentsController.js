angular.module("applicationModule").controller("componentsController", ["$scope", "loginService", function($scope, loginService) {
	
	$scope.isHome = true;
	$scope.isConfigurator = false;
	$scope.isVisione = false;
	$scope.isEsperienza = false;
	$scope.isContatti = false;
	$scope.isStores = false;
	$scope.isAccesso = false;
	$scope.isPreferiti = false;
	$scope.isOrdini = false;
	
	$scope.user;
	
	$scope.setUser = function(t){
		$scope.user = t;
	}
	
	$scope.getUser = function(){
		return $scope.user;
	}
	
	$scope.logOut = function (){
		$scope.setUser(null);
		loginService.logOut();
		$scope.setHome();
	}
	
	loginService.getCurrentUser().then(function(data){
		$scope.setUser(data);
		console.log ("l'utente è " + data);
		console.log(data);
	},
		function(reason){
		console.log('reason');
	}
	)
	
	$scope.nappeFisse = [ {
		datasource : "images/item.jpg",
		idaccessorio : 1,
		attivo : false
	}, {
		datasource : "images/item2.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item3.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item4.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item2.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item3.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item4.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item.jpg",
		idaccessorio : 2,
		attivo : false
	}, {
		datasource : "images/item2.jpg",
		idaccessorio : 2,
		attivo : false
	} ];
	
	$scope.wowInit = function(config){
		if(config){
			new WOW(config).init();
		} else {
			new WOW().init();
		}
	};

	$scope.setHome = function(){
		$scope.isHome = true;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};

	$scope.setConfigurator = function(){
		$scope.isHome = false;
		$scope.isConfigurator = true;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};

	$scope.setVisione = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = true;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};

	$scope.setEsperienza = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = true;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};

	$scope.setContatti = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = true;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};

	$scope.setStores = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = true;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};
	
	$scope.setAccesso = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = true;
		$scope.isPreferiti = false;
		$scope.isOrdini = false;
	};
	
	$scope.setPreferiti = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = true;
		$scope.isOrdini = false;
	};
	
	$scope.setOrdini = function(){
		$scope.isHome = false;
		$scope.isConfigurator = false;
		$scope.isVisione = false;
		$scope.isEsperienza = false;
		$scope.isContatti = false;
		$scope.isStores = false;
		$scope.isAccesso = false;
		$scope.isPreferiti = false;
		$scope.isOrdini = true;
	};

}]);
