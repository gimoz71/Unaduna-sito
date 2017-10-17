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
	
	configController.cleanAccessori = function(){
		for(var i = 0; i < configController.accessoriBorsa.length; i++){
			configController.accessoriBorsa[i].attivo = false;
		}
	}
	
	//qui avviene la richiesta del modello in base agli accessori selezionati
	configController.SendData = function(accessorio){

		//attivo il loader e tolgo lo spinner
		configController.visibleManager.loaderVisible = true;
		//configController.visibleManager.spinnerVisible = false;

		if(accessorio.attivo){
			accessorio.attivo = false;
		} else {
			configController.cleanAccessori();
			accessorio.attivo = true;
		}

		var hasAccessorio = false;
		switch(accessorio.idaccessorio){
			case 1:
				hasAccessorio = true && accessorio.attivo;
				break;
			case 2:
				hasAccessorio = false;
				break;
			default:
				hasAccessorio = false;
				break;
		}

		//parametri di chiamata
		var data = {
				accessorio: hasAccessorio
		};

		//configurazioni di chiamata
		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

		//effettuo la chiamata
		//$http.post('https://dzaentokb4.execute-api.eu-central-1.amazonaws.com/unadunaurl',data, config)//chiamata alla funziona Lambda che accede a S3 via URL; l'esperimento è fallito in quanoto risulta piu' lento
		$http.post('https://cnohm5u3jh.execute-api.eu-central-1.amazonaws.com/configuratorstage',data, config)

		.then(function(success){

			//ricompongo la stringa base64 dell'immagine spritesheet che ho creato su Lambda
			var image = 'data:image/jpg;base64,';
			for(var i = 0; i < success.data.imageArray.length; i++){
				image = image + success.data.imageArray[i];
			}
			//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
			var dataSpin = {
					width: 960,
	                height: 540,
	                source: image,
	                frames: 8,
	                framesX: 8,
	                sense: -1,
	                responsive: true,
	                animate: false,
	                detectSubsampling : true,
	                scrollThreshold   : 200,
	                mods: [
	                    'drag',
	                    '360',
						'ease'
	                ]
			};

			$('#spritespin').spritespin(dataSpin);
			$('#spritespin').fadeIn();
			configController.visibleManager.loaderVisible = false;
			configController.visibleManager.spinnerVisible = true;

		});
	};
	
	//qui avviene la richiesta del modello in base agli accessori selezionati
	configController.SendData2 = function(accessorio){
		
		//attivo il loader e tolgo lo spinner
		configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;
		
		var baseImagePath = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/modello-test/testsingole/";
		var accessorioPath = "accessorio/";
		var accessorio2Path = "accessorio2/";
		var basePath = "base/";
		
		//a regime questi dati devono essere caricati dinamicamente
		var baseAccessorio = [baseImagePath + basePath + "source_0001.jpg",
			baseImagePath + basePath + "source_0002.jpg",
			baseImagePath + basePath + "source_0003.jpg",
			baseImagePath + basePath + "source_0004.jpg",
			baseImagePath + basePath + "source_0005.jpg",
			baseImagePath + basePath + "source_0006.jpg",
			baseImagePath + basePath + "source_0007.jpg",
			baseImagePath + basePath + "source_0008.jpg",];
		
		var sourceAccessorio = [baseImagePath + accessorioPath + "source_0001.jpg",
			baseImagePath + accessorioPath + "source_0002.jpg",
			baseImagePath + accessorioPath + "source_0003.jpg",
			baseImagePath + accessorioPath + "source_0004.jpg",
			baseImagePath + accessorioPath + "source_0005.jpg",
			baseImagePath + accessorioPath + "source_0006.jpg",
			baseImagePath + accessorioPath + "source_0007.jpg",
			baseImagePath + accessorioPath + "source_0008.jpg",];
		
		var sourceAccessorio2 = [baseImagePath + accessorio2Path + "source_0001.jpg",
			baseImagePath + accessorio2Path + "source_0002.jpg",
			baseImagePath + accessorio2Path + "source_0003.jpg",
			baseImagePath + accessorio2Path + "source_0004.jpg",
			baseImagePath + accessorio2Path + "source_0005.jpg",
			baseImagePath + accessorio2Path + "source_0006.jpg",
			baseImagePath + accessorio2Path + "source_0007.jpg",
			baseImagePath + accessorio2Path + "source_0008.jpg",];

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
				break;
			case 2:
				dataSource = sourceAccessorio2;
				break;
			default:
				dataSource = baseAccessorio;
				break;
		}

		//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
		var dataSpin = {
				width: 960,
                height: 540,
                source: dataSource,
                sense: 1,
                responsive: true,
                animate: false,
                detectSubsampling : true,
                scrollThreshold   : 200,
                mods: [
                    'drag',
                    '360'
                ]
		};

		$('#spritespin').spritespin(dataSpin);
		configController.visibleManager.loaderVisible = false;
		configController.visibleManager.spinnerVisible = true;

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
            slidesPerView: 8,
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
                   slidesPerView: 1
               },
               480: {
                   slidesPerView: 3
               },
               768: {
                   slidesPerView: 5
               },
               992: {
                   slidesPerView: 5
               },
               1200: {
                   slidesPerView: 8
               }
           }
        });
	    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
	    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo')
	    $('.accessori').animate({opacity:'1'}, 1000, function() {
	        $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger');
	        $('#a-middle').centerElement();
	        $('#a-middle').animate({opacity:'1'}, 1000)
	        // $('.swiper-slide a').click(function() {
	        //     $.fn.animateAccessoriBar('accessori','riepilogo','swiper-slide','trigger');
	        //     // alert('click');
	        //
	        // })
	    });
	    
	    configController.visibleManager.loaderVisible = false;
	};
});
