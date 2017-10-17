angular.module("applicationModule").controller("componentsController", ["$scope","accessoriesService", function($scope, accessoriesService) {

	$scope.isHome = true;
	$scope.isConfigurator = false;
	$scope.isVisione = false;
	$scope.isEsperienza = false;
	$scope.isContatti = false;
	$scope.isStores = false;
	
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
	
	$scope.tipiAccessori = accessoriesService.tipiAccessoriList;

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

//	$scope.initConfiguratore = function(){
//		
//		//testo la chiamata per il model1, poi deve essere reso dinamico
//		//accessoriesService.getTipiAccessoriRemote("modello1")
//		
//		//riempio il resto dinamicamente (per ora fisso di test sulle nappe)
//		//accessoriesService.addAllAccessories($scope.nappeFisse);
//		
//        /*------------------------------------*/
//        /* settaggio vari swiper */
//        /*------------------------------------*/
//
//        var swiper_categorie = new Swiper('.accessori-categoria', {
//            pagination: '.swiper-pagination',
//            slidesPerView: 6,
//            paginationClickable: true,
//            spaceBetween: 0,
//            keyboardControl: true,
//            grabCursor: true,
//            breakpoints: {
//               320: {
//                   slidesPerView: 3
//               },
//               480: {
//                   slidesPerView: 3
//               },
//               768: {
//                   slidesPerView: 4
//               },
//               992: {
//                   slidesPerView: 6
//               },
//               1200: {
//                   slidesPerView: 6
//               }
//           }
//        });
//        var swiper_accessori = new Swiper('.accessori-thumb', {
//            pagination: '.swiper-pagination',
//            slidesPerView: 8,
//            paginationClickable: true,
//            spaceBetween: 0,
//            keyboardControl: true,
//            nextButton: '.swiper-button-next',
//            prevButton: '.swiper-button-prev',
//            // centeredSlides: 'true',
//            keyboardControl: 'true',
//            grabCursor: true,
//            lazyLoading: 'true',
//            // slidesOffsetBefore: 60,
//            // slidesOffsetAfter: 60,
//            breakpoints: {
//               320: {
//                   slidesPerView: 1
//               },
//               480: {
//                   slidesPerView: 3
//               },
//               768: {
//                   slidesPerView: 5
//               },
//               992: {
//                   slidesPerView: 5
//               },
//               1200: {
//                   slidesPerView: 8
//               }
//           }
//        });
//		
//	    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
//	    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo')
//	    $('.accessori').animate({opacity:'1'}, 1000, function() {
//	        $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger');
//	        $('#a-middle').animate({opacity:'1'}, 1000)
//	        // $('.swiper-slide a').click(function() {
//	        //     $.fn.animateAccessoriBar('accessori','riepilogo','swiper-slide','trigger');
//	        //     // alert('click');
//	        //
//	        // })
//	    });
//	    $('#a-middle').centerElement();
//	};
}]);
