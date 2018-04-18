angular.module('configuratorModule').controller('unadunaConfiguratorController2', function($http, $scope, $filter, listeService, $log){

	$scope.$log = $log;

	var configController = this;

	$scope.spinAnim = true;
	$scope.spinIcon = true;

	$scope.spinnerVisibleTest = false;

	$scope.modelli = [];
	$scope.entita = [];

	$scope.stack = [];

	$scope.tipiAccessori = new Map();
	$scope.entitaTipoAccessorioSelezionato = [];
	$scope.tipiAccossoriModelloSelezionato = [];
	$scope.modelloSelezionato = '';

	$scope.swiperAccessori = null;
	$scope.swiperCategorie = null;

	$scope.dataUrl = "";

	$scope.tipoEntitaSelezionata = "colore";//di default apro il pannello colori
	$scope.nomeEntitaSelezionata = "black";//di default apro il pannello colori

	$scope.embossSelezionato = false;
	$scope.mapEmboss = new Map();

	$scope.coloreVincolante = "black";//scelgo il nero come colore vincolante di default
	$scope.scegliColore = true;

	$scope.metalloVincolante = "argento";
	$scope.mapMetalloTracolle = new Map();
	$scope.mapMetalloBorchie = new Map();

	$scope.borchieSelezionate = false;
	$scope.tracollaSelezionata = false;

	$scope.metalleriaObbligatoria = [];

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
		$scope.tipoEntitaSelezionata = tipoAccessorio;
		//preparo la mappa che ha chiave = entita.nome - valore = entita
		//fadeout del componente
		if(tipoAccessorio == "colore"){
			//qui devo gestire le limitazioni relative al colore
			$scope.scegliColore = true;
		} else {
			$scope.scegliColore = false;
		}
		if(tipoAccessorio == "metalleria"){
			//qui devo gestire le limitazioni relative al colore
			$scope.scegliMetallo = true;
		} else {
			$scope.scegliMetallo = false;
		}
		$scope.entitaTipoAccessorioSelezionato = [];
		for(var i = 0; i < $scope.modelli.length; i++){
			var modello = $scope.modelli[i];
			if(modello.nome == $scope.modelloSelezionato){
				for(var j = 0; j < $scope.entita.length; j++){
					var entitaSingola = $scope.entita[j];
					if(entitaSingola.categoria == tipoAccessorio & entitaSingola.modello == $scope.modelloSelezionato){
						if(entitaSingola.vincoloColore == true){
							if(entitaSingola.categoria == "stile"){
								$scope.mapEmboss.set(entitaSingola.colore, entitaSingola);
							}
							if(entitaSingola.colore == $scope.coloreVincolante){
								$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
							}
						} else if(entitaSingola.vincoloMetallo == true) {
							if(entitaSingola.categoria == "tracolle"){
								$scope.mapMetalloTracolle.set(entitaSingola.metallo, entitaSingola);
								$scope.mapMetalloBorchie.set(entitaSingola.metallo, entitaSingola);
							}else if (entitaSingola.categoria == "borchie"){
								$scope.mapMetalloBorchie.set(entitaSingola.metallo, entitaSingola);
							}
							if(entitaSingola.metallo == $scope.metalloVincolante){
								$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
							}
						} else {
							$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
						}
					}
				}
			}
		}
	}

	configController.scegliModello = function(modello){

		$scope.embossSelezionato = false;
		$scope.mapEmboss = new Map();

		$scope.coloreVincolante = "black";//scellgo il nero come colore vincolante di default
		$scope.scegliColore = true;

		$scope.metalloVincolante = "argento";
		$scope.mapMetalloTracolle = new Map();
		$scope.mapMetalloBorchie = new Map();

		$scope.borchieSelezionate = false;
		$scope.tracollaSelezionata = false;

		$scope.metalleriaObbligatoria = [];



		$(".dropdown-toggle").dropdown("toggle");

		$scope.stack = [];
		//$scope.stack.push(modello.urlStripeHD);
		configController.aggiungiElementoAStack(modello.urlStripeHD, 0, false);
		$scope.modelloSelezionato = modello.nome;
		$scope.tipiAccessoriModelloSelezionato = $scope.tipiAccessori.get(modello.nome);


		$scope.metalleriaObbligatoria = configController.getUrlMetalleria(modello.nome, "argento");
		configController.aggiungiElementoAStack($scope.metalleriaObbligatoria, 3, false);

		//apro il pannello dei colori
		configController.selezioneTipoAccessorio("colore");

		configController.caricaSpinner();

	}

	configController.selezionaEntita = function(entita){

		if(entita.nome == $scope.nomeEntitaSelezionata && $scope.tipoEntitaSelezionata != "colore" && $scope.tipoEntitaSelezionata != "metalleria"){
				$scope.nomeEntitaSelezionata = "";
		} else {
				$scope.nomeEntitaSelezionata = entita.nome;
		}

		html2canvas(document.querySelector("#spritespin"), { async:false }).then(canvas => {
			$scope.dataUrl = canvas.toDataURL();

		});

		if($scope.tipoEntitaSelezionata == "colore"){

			if($scope.embossSelezionato){
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss
				var embossUrl = $scope.mapEmboss.get(entita.colore);
				if(embossUrl){
					configController.aggiungiElementoAStack(embossUrl.urlStripeHD, embossUrl.ordine);
				}
			}
		}
		if($scope.tipoEntitaSelezionata == "metalleria"){
			if($scope.tracollaSelezionata){
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss
				var tracollaUrl = $scope.mapMetalloTracolle.get(entita.metallo);
				if(tracollaUrl){
					configController.aggiungiElementoAStack(tracollaUrl.urlStripeHD, tracollaUrl.ordine, false);
				}
			}
			if($scope.borchieSelezionate){
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss
				var borchieUrl = $scope.mapMetalloBorchie.get(entita.metallo);
				if(borchieUrl){
					configController.aggiungiElementoAStack(borchieUrl.urlStripeHD, borchieUrl.ordine, false);
				}
			}
		}

		if($scope.scegliColore){
			$scope.coloreVincolante = entita.colore;
		}
		if($scope.scegliMetallo){
			$scope.metalloVincolante = entita.metallo;
		}
		configController.aggiungiStrato(entita.urlStripeHD, entita.ordine, (entita.categoria != "colore" && entita.categoria != "metalleria"));

		if($scope.tipoEntitaSelezionata == "stile"){
			if($scope.stack.indexOf(entita.urlStripeHD) == -1){
				$scope.embossSelezionato = false;
			} else {
				$scope.embossSelezionato = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null)
			}
		}

		if($scope.tipoEntitaSelezionata == "borchie"){
			if($scope.stack.indexOf(entita.urlStripeHD) == -1){
				$scope.borchieSelezionate = false;
			} else {
				$scope.borchieSelezionate = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null)
			}
		}
		if($scope.tipoEntitaSelezionata == "tracolle"){
			if($scope.stack.indexOf(entita.urlStripeHD) == -1){
				$scope.tracollaSelezionata = false;
			} else {
				$scope.tracollaSelezionata = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null)
			}
		}
	}

	configController.aggiungiStrato = function(strato, ordine, eliminabile){
		configController.aggiungiElementoAStack(strato, ordine, eliminabile);
		configController.caricaSpinner();
	}

	configController.aggiungiElementoAStack = function(strato, ordine, eliminabile){
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

		} else { //lo strato è già nello stack
			if(eliminabile){
				$scope.stack[ordine] = "";
			}
		}
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
		var date1 = new Date();

		//attivo il loader e tolgo lo spinner
		// configController.visibleManager.loaderVisible = true; // non funziona
		// configController.visibleManager.spinnerVisible = false;
//
		configController.setVisible(false);

		//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
		var renderType;

		if (isTouchDevice()) {
			renderType = "image"
		} else {
			renderType = "image"
		}

		var cleanStack = configController.pulisciStack();

		var firstExecInit = true;
		var firstExecComplete = true;

		if($('#spritespin') != undefined &&  $('#spritespin').data("spritespin") != undefined){

			$scope.dataUrl = $('#spritespin').data("spritespin").canvas[0].toDataURL();
		}

		mergeImages(cleanStack).then(b64 => {
			dataSourceString = b64;
			var date2 = new Date();
			var diff = date2 - date1;
			$scope.$log.log('durata fusione immagini: ' + diff);
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
					if(firstExecInit){

                		firstExecInit = false;
						$.fn.sepLine('first-divider', 'swiper-container', 'accessori'); // rif. descrizione funzione sepline: custom.js linea 77
						$.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo'); // rif. descrizione funzione yammHeight: custom.js linea 86
						$(".riepilogo").fadeIn();
						$("#transition-image").show();
                	}
                },
				onLoad: function() {
					// html2canvas(document.querySelector("#spritespin"), { async:false }).then(canvas => {
					// 	$scope.dataUrl = canvas.toDataURL();
					//
					// });


				},
				onComplete: function() {
					if(firstExecComplete){
						firstExecComplete = false;

						if ($scope.spinIcon == true) {
							var pos1 = $('#spinIcon').position();
							$("#spinIcon").fadeIn().delay(100).fadeOut();
							$("#spinIcon img").animate({ 'margin-left': '50px'}, 1000);
							$('#a-middle').animate({opacity:'1'}, 500);
							$('.accessori').animate({opacity:'1'}, 500, function() { // all'avvio lancia il 'fadein' degli elementi dell'interfaccia
						        // $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger'); // rif. descrizione funzione animateAccessoriBar: custom.js linea 94
								$('#a-middle').centerElement(); // rif. descrizione funzione centerElement: custom.js linea 139
						    });
							$("#loader").fadeOut();
						}
						$("#transition-image").delay(100).fadeOut();


						// configController.visibleManager.loaderVisible = false; // non funziona

						$scope.spinIcon = false;
						$scope.spinAnim = false;

						var date3 = new Date();
						var diff = date3 - date2;
						$scope.$log.log('durata caricamento spinner: ' + diff);


					}
				}
            }
			$('#spritespin').spritespin(dataSpin);
			$(window).trigger("resize");
		});

		configController.priceManager.price = 0;

		function isTouchDevice() {
		    return 'ontouchstart' in document.documentElement;
		}

		configController.setVisible(true);

	};

	configController.setVisible = function(visible){
		$scope.spinnerVisibleTest = visible;
	}

	configController.getUrlMetalleria = function(modello, metallo){
		for(var i = 0; i < $scope.entita.length; i++){
			var singolaEntita = $scope.entita[i];
			if(singolaEntita.modello == modello && singolaEntita.metallo == metallo && singolaEntita.categoria == "metalleria"){
				return singolaEntita.urlStripeHD;
			}
		}
		return "";
	}

	configController.initConfiguratore = function(){

		//1. devo fare il caricamento massivo iniziale delle configurazioni (solo la struttura json dal DB, non le immagini)
		listeService.getModelli().then(function (res) {
			if(res.data.esito.codice == 100){
				$scope.modelli = res.data.modelli;
				$(".dropdown-toggle").dropdown("toggle");
				listeService.getAccessori().then(function(res2) {
					$scope.entita = res2.data.accessori;
					//inizializzo la mappa con gli elenchi dei tipi di accessori
					for(var i = 0; i < $scope.modelli.length; i++){
						var elencoAccessori = [];
						var modello = $scope.modelli[i];
						$scope.tipiAccessori.set(modello.nome, modello.accessori);

//						for(var j = 0; j < $scope.entita.length; j++){
//							var entitaSingola = $scope.entita[j];
//							if(entitaSingola.modello == modello.nome){
//								if(elencoAccessori.indexOf(entitaSingola.categoria) == -1){
//									elencoAccessori.push(entitaSingola.categoria);
//								}
//							}
//						}
//						$scope.tipiAccessori.set(modello.nome, elencoAccessori);
					}
				});
			}
	    });

		configController.visibleManager.loaderVisible = true;
		configController.visibleManager.spinnerVisible = false;

		$(document).on('click', '.yamm .dropdown-menu', function(e) {
		  e.stopPropagation()
		});



		/* gestione elementi dell'interfaccia */

		var aperto = 0;

		$("#pz").pinchzoomer();

		$('#a-middle').centerElement();

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
		$.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo'); // rif. descrizione funzione yammHeight: custom.js linea 86
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

	};

});
