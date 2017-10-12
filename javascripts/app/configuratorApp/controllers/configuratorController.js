angular.module('configuratorModule').controller('unadunaConfiguratorController', function($http, $scope, $filter){

	var configController = this;

	configController.accessoriBorsa = [
	    	{
	    		datasource: "images/item.jpg",
	    		idaccessorio: 1,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item2.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item3.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item4.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item2.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item3.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item4.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	    	{
	    		datasource: "images/item2.jpg",
	    		idaccessorio: 2,
	    		attivo: false
	    	},
	];
	
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
			spinnerVisible: false
	};

	configController.cleanAccessori = function(){
		for(var i = 0; i < configController.accessoriBorsa.length; i++){
			configController.accessoriBorsa[i].attivo = false;
		}
	}

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
});
