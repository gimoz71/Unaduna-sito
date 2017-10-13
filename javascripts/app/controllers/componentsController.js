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
	
	$scope.initConfiguratore = function(){
		$('#a-middle').centerElement();
	    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
	    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo')
	    $('.accessori').animate({opacity:'1'}, 1000, function() {
	        $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger');
	        $('#a-middle').animate({opacity:'1'}, 1000)
	        // $('.swiper-slide a').click(function() {
	        //     $.fn.animateAccessoriBar('accessori','riepilogo','swiper-slide','trigger');
	        //     // alert('click');
	        //
	        // })
	    });
	};
	
})