angular.module('configuratorModule').controller('unadunaConfiguratorController', function($http, $scope, $filter, accessoriesService){

	var configController = this;

	//configController.accessoriBorsa = accessoriesService.accessoriesList;ù
	configController.accessoriBorsa = [
	    	{
	    		imageSrc: "images/item.jpg",
	    		idaccessorio: 1,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item2.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item3.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item4.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item2.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item3.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item4.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	    	{
	    		imageSrc: "images/item2.jpg",
	    		idaccessorio: 3,
	    		attivo: false
	    	},
	];

	//configController.tipiAccessori = accessoriesService.tipiAccessoriList;

	configController.getRepeaterClass = function(accessorio, index){
		var toReturn = "";
		if(index == 0){
			toReturn = " swiper-slide-previous"
		} else if (index == 1){
			toReturn = " swiper-slide-active"
		} else if (index == 2){
			toReturn = " swiper-slide-next"
		} else {
			toReturn = "swiper-slide";
		}

		return toReturn;
	}

	configController.visibleManager = {
			loaderVisible: false,
			spinnerVisible: true
	};

	configController.priceManager = {
			price: 0
	}

	configController.cleanAccessori = function(){
		for(var i = 0; i < configController.accessoriBorsa.length; i++){
			configController.accessoriBorsa[i].attivo = false;
		}
	}


	//qui avviene la richiesta del modello in base agli accessori selezionati
	configController.SendData2 = function(accessorio){

		//attivo il loader e tolgo lo spinner
		//configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;

		var prezzo = 0;
		var baseImagePath = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/modello-test/testsingole_hd/new/";

		//a regime questi dati devono essere caricati dinamicamente
		var baseAccessorio = baseImagePath + "base_X_X_X_X_X_{frame}.jpg";
		var sourceAccessorio = baseImagePath + "base_X_manici_X_X_tracolle_{frame}.jpg";
		var sourceAccessorio2 = baseImagePath + "base_borchie_manici_ciondoli_nappe_tracolle_{frame}.jpg";

		if(accessorio.attivo){
			accessorio.attivo = false;
		} else {
			configController.cleanAccessori();
			accessorio.attivo = true;
		}

		var dataSource = [];
		var hasAccessorio = false;
		switch(accessorio.idaccessorio){
			case 1:
				dataSource = sourceAccessorio;
				prezzo = 100;
				break;
			case 2:
				dataSource = sourceAccessorio2;
				prezzo = 150;
				break;
			default:
				dataSource = baseAccessorio;
				prezzo = 50;
				break;
		}

		//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
		var dataSpin = {
				width: 960,
                height: 960,
                source: SpriteSpin.sourceArray(dataSource, {
                	  frame: [1,8],
                	  digits: 4
                	  }),
                sense: 1,
                responsive: true,
                animate: false,
                detectSubsampling : true,
                scrollThreshold   : 200,
                mods: [
                    'drag',
                    '360'
                ],
                onInit: function(){
                		//configController.visibleManager.loaderVisible = true;
                		$('#loader').removeClass('ng-hide');
                },
                onDraw: function(){
                		//configController.visibleManager.loaderVisible = false;
                		$('#loader').addClass('ng-hide');
                }
		};

		$('#spritespin').spritespin(dataSpin);
		//configController.visibleManager.loaderVisible = false;
		configController.visibleManager.spinnerVisible = true;
		configController.priceManager.price = prezzo;

	};

	configController.initConfiguratore = function(){

		//testo la chiamata per il model1, poi deve essere reso dinamico
		//accessoriesService.getTipiAccessoriRemote("modello1")

		//riempio il resto dinamicamente (per ora fisso di test sulle nappe)
		//accessoriesService.addAllAccessories($scope.nappeFisse);

		configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;

        /*------------------------------------*/
        /* settaggio vari swiper */
        /*------------------------------------*/

        var swiper_categorie = new Swiper('.accessori-categoria', {
            pagination: '.swiper-pagination',
            slidesPerView: 6,
            paginationClickable: true,
            spaceBetween: 0,
            keyboardControl: true,
            grabCursor: true,
            breakpoints: {
               320: {
                   slidesPerView: 3
               },
               480: {
                   slidesPerView: 3
               },
               768: {
                   slidesPerView: 4
               },
               992: {
                   slidesPerView: 6
               },
               1200: {
                   slidesPerView: 6
               }
           }
        });
        var swiper_accessori = new Swiper('.accessori-thumb', {
            pagination: '.swiper-pagination',
            slidesPerView: 12,
            paginationClickable: true,
            spaceBetween: 0,
            keyboardControl: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            // centeredSlides: 'true',
            keyboardControl: 'true',
            grabCursor: true,
            lazyLoading: 'true',
            // slidesOffsetBefore: 60,
            // slidesOffsetAfter: 60,
            breakpoints: {
               320: {
                   slidesPerView: 3
               },
               480: {
                   slidesPerView: 5
               },
               768: {
                   slidesPerView: 6
               },
               992: {
                   slidesPerView: 8
               },
               1200: {
                   slidesPerView: 12
               }
           }
        });

		/* apertura menu */

		setTimeout(function() {
			$(".modello").trigger('click');
		},10);
		
		$('.borsaModel').click(function() {
			$('.modello').trigger('click');
			$('.variante').trigger('click');

		});

		$('.borsaVariante').click(function() {
			// $('.modello').trigger('click');
			$('.variante').trigger('click');

		});


		$(document).on('click', '.yamm .dropdown-menu', function(e) {
		  e.stopPropagation()
		})



		/* gestioe elementi dell'interfaccia */

		var aperto = 0;
	    $.fn.sepLine('first-divider', 'swiper-container', 'accessori'); // rif. descrizione funzione sepline: custom.js linea 77
	    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo'); // rif. descrizione funzione yammHeight: custom.js linea 86
	    $('.accessori').animate({opacity:'1'}, 1000, function() { // all'avvio lancia il 'fadein' degli elementi dell'interfaccia
	        // $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger'); // rif. descrizione funzione animateAccessoriBar: custom.js linea 94
			$('#a-middle').centerElement(); // rif. descrizione funzione centerElement: custom.js linea 139
	        $('#a-middle').animate({opacity:'1'}, 1000);
	    });

		// pulsanti apertura/chiusura zoom borsa
		$('#openZoom').click(function() {
			$('.zoom').fadeIn();
			$(".zoom img").imagePanning();
		});
		$('#closeZoom').click(function() {
			$('.zoom').fadeOut();
		});


		/* edito il nome della borsa nel configuratore *DA COMPLETARE* */
		$('#edit-text').click(function() {
			var name = $(this).text();
			$(this).html('');
			$('<input style="margin-top: -10px; margin-left: -3px;"></input>')
				.attr({
					'type': 'text',
					'name': 'fname',
					'id': 'txt_fullname',
					'size': '10',
					'value': name
				})
				.appendTo('#edit-text');
			$('#txt_fullname').focus();

		});
		$(document).on('blur', '#txt_fullname', function() {
			var name = $(this).val();
			//alert('Make an AJAX call and pass this parameter >> name=' + name);
			$('#edit-text').text(name);
		});

		$('.accessori').css('bottom', $('.riepilogo').outerHeight());
		// customizza la barra di scorrimento del mega menu
		(function($){
			$(window).on("load",function(){
				$(".yamm-content").mCustomScrollbar({
					theme:"minimal-dark",
					scrollButtons:{enable:true},
					scrollInertia:400
				});
				$(".borsaModel").click(function() {
				   $(".dropdown-toggle").dropdown("toggle");
				});
			});
		})(jQuery)


		$(window).resize(function(){
			$('.accessori').css('bottom', $('.riepilogo').outerHeight());
		    $('#a-middle').centerElement();
		    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
		    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo')
		    // $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','notrigger');
		});

	    configController.visibleManager.loaderVisible = false;
	};
});
