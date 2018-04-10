angular.module('configuratorModule').controller('unadunaConfiguratorController2', function($http, $scope, $filter, listeService){

	var configController = this;

	$scope.spinAnim = true;
	$scope.spinIcon = true;

	configController.spinnerVisibleTest = false;
	
	$scope.modelli = [];
	$scope.entita = [];
	
	$scope.stack = [];
	
	$scope.tipiAccessori = new Map();
	$scope.entitaTipoAccessorioSelezionato = [];
	$scope.tipiAccossoriModelloSelezionato = [];
	$scope.modelloSelezionato = '';
	
	$scope.swiperAccessori = null;
	$scope.swiperCategorie = null;
	
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

	configController.selezioneTipoAccessorio = function(tipoAccessorio){
		//preparo la mappa che ha chiave = entita.nome - valore = entita
		//fadeout del componente
		$("#rigaaccessori").fadeOut("slow");
		$scope.entitaTipoAccessorioSelezionato = [];
		for(var i = 0; i < $scope.modelli.length; i++){
			var modello = $scope.modelli[i];
			for(var j = 0; j < $scope.entita.length; j++){
				var entitaSingola = $scope.entita[j];
				if(entitaSingola.categoria == tipoAccessorio & entitaSingola.modello == $scope.modelloSelezionato){
					$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
				}
			}
		}
		//fadein del componente
		$("#rigaaccessori").fadeIn("slow");
	}
	
	configController.scegliModello = function(modello){
		$scope.stack = [];
		$scope.stack.push(modello.urlStripeHD);
		$scope.modelloSelezionato = modello.nome;
		$scope.tipiAccessoriModelloSelezionato = $scope.tipiAccessori.get(modello.nome);
		configController.caricaSpinner();
	}

	configController.selezionaEntita = function(entita){
		configController.aggiungiStrato(entita.urlStripeHD, entita.ordine);
	}
	
	configController.aggiungiStrato = function(strato, ordine){
		var indice = $scope.stack.indexOf(strato);
		
		
		if(indice == -1){ //lo strato non è nello stack
			
			var lastIndex = $scope.stack.length -1;
			if(ordine == lastIndex+1){//metto lo strato in coda
				$scope.stack.push(strato);
			} else if(ordine > lastIndex+1){//metto stringhe vuote fino all'indice dello strato da inserire
				for(var i = lastIndex+1; i <= ordine-1; i++){
					$scope.stack[i] = "";
				}
				$scope.stack.push(strato);
			} else {//sostituisco lo strato esistente nello stack all'indice dello strato da inserire 
				$scope.stack[ordine] = strato;
			}
			
			//$scope.stack.splice(ordine, 0, strato);//aggiunge l'elemento 'strato' nel posto 'ordine'
		} else { //lo strato è già nello stack
			$scope.stack[ordine] = "";
			//$scope.stack.splice(indice, 1);//sostituisco lo strato con stringa vuota
		}
		configController.caricaSpinner();
	}
	
	configController.pulisciStack = function(){
		var tempStack = []
		for(var i = 0; i< $scope.stack.length; i++){
			if($scope.stack[i] != ""){
				tempStack.push($scope.stack[i]);
			}
		}
		return tempStack;
	}
	
	//qui avviene la richiesta del modello in base agli accessori selezionati
	configController.caricaSpinner = function(){
		
		var continueFlag = false;
		html2canvas(document.querySelector("#spritespin")).then(canvas => {

			$(".transition-image").attr('src', canvas.toDataURL());
			$(".transition-image").show();
			continueFlag = true;
		});
		
		//attivo il loader e tolgo lo spinner
		configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;

		configController.setVisible(false);

		//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
		var renderType;

		if (isTouchDevice()) {
			renderType = "image"
		} else {
			renderType = "image"
		}
		
		var cleanStack = configController.pulisciStack();
		
		mergeImages(cleanStack).then(b64 => {
			dataSourceString = b64;
			var dataSpin = {
				width: 960,
                height: 960,
				source: dataSourceString,
				frames: 8,
				framesX: 8,
                sense: 1,
				rendering: renderType,
                responsive: true,
                detectSubsampling : true,
                animate: $scope.spinAnim,
				frameTime: 100,
				loop: false,
				stopFrame: 7,
				//renderer: renderType,
                scrollThreshold   : 200,
                plugins: [
                    'drag',
                    '360'
                ],
                onInit: function(){
					if ($scope.spinIcon == false) {

						
					}
                },
				onLoad: function() {
					
				},
                onDraw: function(){
					configController.visibleManager.loaderVisible = true;
					//$('#loader').removeClass('ng-hide');

				},
				onComplete: function() {

					$('#loader').addClass('ng-hide');
					if ($scope.spinIcon == true) {
						var pos1 = $('#spinIcon').position();
						$("#spinIcon").fadeIn().delay(100).fadeOut();
						$("#spinIcon img").animate({ 'margin-left': '50px'}, 1000);
					}
					if ($scope.spinIcon == false) {
						$(".transition-image").fadeOut("slow");
					}
					configController.visibleManager.spinnerVisible = true;
					configController.visibleManager.loaderVisible = false;

					$scope.spinIcon = false;
					$scope.spinAnim = false;
				}
            }
			$('#spritespin').spritespin(dataSpin);
		});

		configController.priceManager.price = 0;

		function isTouchDevice() {
		    return 'ontouchstart' in document.documentElement;
		}
		configController.setVisible(true);
		//configController.visibleManager.loaderVisible = false;


	};

	configController.setVisible = function(visible){
		configController.spinnerVisibleTest = visible;
	}

	configController.initConfiguratore = function(){

		//1. devo fare il caricamento massivo iniziale delle configurazioni (solo la struttura json dal DB, non le immagini)
		listeService.getModelli().then(function (res) {
			if(res.data.esito.codice == 100){
				$scope.modelli = res.data.modelli;
				
				listeService.getAccessori().then(function(res2) {
					$scope.entita = res2.data.accessori;
					//inizializzo la mappa con gli elenchi dei tipi di accessori
					for(var i = 0; i < $scope.modelli.length; i++){
						var elencoAccessori = [];
						var modello = $scope.modelli[i];
						for(var j = 0; j < $scope.entita.length; j++){
							var entitaSingola = $scope.entita[j];
							if(entitaSingola.modello == modello.nome){
								if(elencoAccessori.indexOf(entitaSingola.categoria) == -1){
									elencoAccessori.push(entitaSingola.categoria);
								}
							}
						}
						$scope.tipiAccessori.set(modello.nome, elencoAccessori);
					}
				});
			}
	    });

		configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;
		
		/* apertura menu */

		$('.borsaModel').click(function() {
			$('.modello').trigger('click');
			//$('.variante').trigger('click');

		});

		setTimeout(function() {
			$(".modello").trigger('click');
   		},1000);

		$(document).on('click', '.yamm .dropdown-menu', function(e) {
		  e.stopPropagation()
		});

		/* gestione elementi dell'interfaccia */

		var aperto = 0;
	    $.fn.sepLine('first-divider', 'swiper-container', 'accessori'); // rif. descrizione funzione sepline: custom.js linea 77
	    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo'); // rif. descrizione funzione yammHeight: custom.js linea 86
	    $('.accessori').animate({opacity:'1'}, 500, function() { // all'avvio lancia il 'fadein' degli elementi dell'interfaccia
	        // $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger'); // rif. descrizione funzione animateAccessoriBar: custom.js linea 94
			$('#a-middle').centerElement(); // rif. descrizione funzione centerElement: custom.js linea 139
	        $('#a-middle').animate({opacity:'1'}, 500);
	    });

		$(".zoom img").pinchzoomer();

		// pulsanti apertura/chiusura zoom borsa
		$('#openZoom').click(function() {
			$('.zoom').css({'z-index':'10'}).animate({opacity: '1'});
		});
		$('#closeZoom').click(function() {
			$('.zoom').animate({opacity: 0}, {complete: function(){ $(this).css({'z-index': '0'}) }})
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
