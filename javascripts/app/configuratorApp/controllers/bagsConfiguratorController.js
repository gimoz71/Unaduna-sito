angular.module('configuratorModule').controller('unadunaConfiguratorController2', function($http, $scope, $filter, listeService, $log, $window, $timeout){

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
	$scope.tipiAccessoriModelloSelezionato = [];
	$scope.modelloSelezionato = '';

	$scope.categorieTracolle = [];
	$scope.modelliTracolleOro = new Map();
	$scope.modelliTracolleArgento = new Map();
	$scope.variantiTracolle = [];

	$scope.dataUrl = "";

	$scope.tipoEntitaSelezionata = "colore";//di default apro il pannello colori
	$scope.nomeEntitaSelezionata = "black";//di default apro il pannello colori

	$scope.embossSelezionato = false;
	$scope.nomeStileSelezionato = "";
	$scope.mapEmboss = new Map();

	$scope.coloreVincolante = "black";//scelgo il nero come colore vincolante di default
	$scope.scegliColore = true;
	$scope.scegliEmboss = false;

	$scope.metalloVincolante = "argento";
	$scope.mapMetalloTracolle = new Map();
	$scope.mapMetalloBorchie = new Map();

	$scope.borchieSelezionate = false;
	$scope.nomeBorchiaSelezionata = "";
	$scope.tracollaSelezionata = false;
	$scope.coloreSelezionato = "black";

	$scope.metalleriaObbligatoria = [];

	$scope.removable = false;

	$scope.resolution = "560";
	
	$scope.symbolsUrlStack = [];
	$scope.symbolArray = []; 
	$scope.symbolEnabled = true;
	$scope.baseUrlSymbols = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/MODELLO/INIZIALI/";
	$scope.baseUrlThumbCategorieTracolle = "https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/MODELLO/TRACOLLE/THUMBNAILS/";
	$scope.symbolConfigurations = [["M"],["MSX","MDX"],["SX","M","DX"]];
	$scope.inizialiPreview = "";
	
	$scope.currentFrame = 0;


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

	configController.getThumbnailName = function(entita){
		var toReplace = configController.modelNameTranslate($scope.modelloSelezionato);
		var thumbnailName = $scope.baseUrlThumbCategorieTracolle.replace("MODELLO", toReplace) + "THUMBNAIL_" + entita.replace("-","_") + ".png";
		return thumbnailName;
	}

	configController.selezionaCategoriaTracolla = function(entita) {
		$scope.variantiTracolle = $scope.modelliTracolleOro.get(entita);
		$scope.tipoEntitaSelezionata = "varianti-tracolle";
	}

	configController.selezioneTipoAccessorio = function(tipoAccessorio){
		$scope.tipoEntitaSelezionata = tipoAccessorio;
		//preparo la mappa che ha chiave = entita.nome - valore = entita
		//fadeout del componente
		if(tipoAccessorio == "tracolle"){
			$scope.tipoEntitaSelezionata = "tipi-tracolle";

		} else {

			if (tipoAccessorio == "colore") {
				//qui devo gestire le limitazioni relative al colore
				$scope.scegliColore = true;
			} else {
				$scope.scegliColore = false;
			}
			if (tipoAccessorio == "metalleria") {
				//qui devo gestire le limitazioni relative al colore
				$scope.scegliMetallo = true;
			} else {
				$scope.scegliMetallo = false;
			}
			if (tipoAccessorio == "stile") {
				$scope.scegliEmboss = true;
			} else {
				$scope.scegliEmboss = false;
			}
			$scope.entitaTipoAccessorioSelezionato = [];
			for (var i = 0; i < $scope.modelli.length; i++) {
				var modello = $scope.modelli[i];
				if (modello.nome == $scope.modelloSelezionato) {
					for (var j = 0; j < $scope.entita.length; j++) {
						var entitaSingola = $scope.entita[j];
						if (entitaSingola.categoria == tipoAccessorio & entitaSingola.modello == $scope.modelloSelezionato) {
							if (entitaSingola.vincoloColore == true) {
								if (entitaSingola.categoria == "stile") {
									$scope.mapEmboss.set(entitaSingola.nomeStile + "_" + entitaSingola.colore, entitaSingola);
								}
								if (entitaSingola.colore == $scope.coloreVincolante) {
									$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
								}
							} else if (entitaSingola.vincoloMetallo == true) {
								if (entitaSingola.categoria == "tracolle") {
									$scope.mapMetalloTracolle.set(entitaSingola.metallo, entitaSingola);
									$scope.mapMetalloBorchie.set(entitaSingola.metallo, entitaSingola);
								} else if (entitaSingola.categoria == "borchie") {
									$scope.mapMetalloBorchie.set(entitaSingola.nomeBorchia + "_" + entitaSingola.metallo, entitaSingola);
								}
								if (entitaSingola.metallo == $scope.metalloVincolante) {
									$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
								}
							} else {
								$scope.entitaTipoAccessorioSelezionato.push(entitaSingola);
							}
						}
					}
				}
			}

			//ordinamento delle entità
			$scope.entitaTipoAccessorioSelezionato = configController.ordinaEntita($scope.entitaTipoAccessorioSelezionato);

		}
		
	}

	configController.ordinaEntita = function (entitaNonOrdinate) {

		var size = entitaNonOrdinate.length;
		var tempEntita = new Array(size);

		for (var i = 0; i < size; i++) {
			if (entitaNonOrdinate[i]["ordineInterfaccia"] == null || entitaNonOrdinate[i]["ordineInterfaccia"] == "" || entitaNonOrdinate[i]["ordineInterfaccia"] == 0){
				return entitaNonOrdinate;
			}	
			tempEntita[entitaNonOrdinate[i]["ordineInterfaccia"] - 1] = entitaNonOrdinate[i];
		}

		return tempEntita;
	}

	configController.getResolutionPlaceHolder = function(){
		var screenWidth = $("#canvasWrapper").innerWidth();
		var screenHeight = $("#canvasWrapper").innerHeight();

		var placeHolder = "";
		var minSize = (screenWidth > screenHeight ? screenHeight : screenWidth);
		if (minSize <= 560) {
			placeHolder = "560";
		} else if (minSize > 560 && minSize < 720) {
			placeHolder = "720"
		} else if (minSize >= 720) {
			placeHolder = "960"
		}

		return placeHolder;
	}

	configController.gestisciTracolle = function() {
		for(var i = 0; i< $scope.entita.length; i++){
			var entita = $scope.entita[i];
			if(entita.categoria == "tracolle"){
				//prendo il nome
				var nomeTracolla = entita.nome;

				//trovo la categoria di tracolle
				var split = nomeTracolla.split('_');
				var categoriaTracolla = split[0] + '_' + split[1];

				//inserisco nelle categorie di tracolle
				if ($scope.categorieTracolle.indexOf(categoriaTracolla) == -1){
					$scope.categorieTracolle.push(categoriaTracolla);
				}

				var modelName = configController.getNomeModelloTracolla(split);
				if(entita.metallo == "oro"){
					if (!$scope.modelliTracolleOro.has(categoriaTracolla)) {
						$scope.modelliTracolleOro.set(categoriaTracolla, []);
					}

					if ($scope.modelliTracolleOro.get(categoriaTracolla).indexOf(modelName) == -1) {
						$scope.modelliTracolleOro.get(categoriaTracolla).push(entita);
					}
				} else {
					if (!$scope.modelliTracolleArgento.has(categoriaTracolla)) {
						$scope.modelliTracolleArgento.set(categoriaTracolla, []);
					}

					if ($scope.modelliTracolleArgento.get(categoriaTracolla).indexOf(modelName) == -1) {
						$scope.modelliTracolleArgento.get(categoriaTracolla).push(entita);
					}
				}
			}
		}

	}

	configController.getNomeModelloTracolla = function(splitted) {
		var toReturn = "";
		for (var i = 0; i < splitted.length; i++){
			if (i > 1 && i < splitted.length - 1){
				toReturn += splitted[i];
			}
		}
		return toReturn;
	}

	configController.scegliModello = function(modello){

		//carico solo gli accessori relativi al modello scelto
		listeService.getAccessori(modello.nome).then(function (res2) {
			$scope.entita = res2.data.accessori;
			//inizializzo la mappa con gli elenchi dei tipi di accessori
			$scope.tipiAccessori.set(modello.nome, modello.accessori);
			
			$scope.resolution = configController.getResolutionPlaceHolder();

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
			$scope.inizialiPreview = "";
			$scope.symbolsUrlStack = [];

			configController.gestisciTracolle();

			$(".dropdown-toggle").dropdown("toggle");

			$scope.stack = [];
			var url = modello.urlStripe;
			url = url.replace("RES", $scope.resolution);

			$scope.coloreSelezionato = "black";

			configController.aggiungiElementoAStack(url, 0, false);
			$scope.modelloSelezionato = modello.nome;
			$scope.tipiAccessoriModelloSelezionato = $scope.tipiAccessori.get(modello.nome);

			$scope.metalleriaObbligatoria = configController.getUrlMetalleria(modello.nome, "argento");
			configController.aggiungiElementoAStack($scope.metalleriaObbligatoria, 3, false);

			//apro il pannello dei colori
			configController.selezioneTipoAccessorio("colore");
			configController.caricaSpinner();
			
		});

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

		var url = entita.urlStripe;
		url = url.replace("RES", $scope.resolution);
		//url = url.replace("560", $scope.resolution);
		//url = url.replace("720", $scope.resolution);
		//url = url.replace("960", $scope.resolution);
		//url = url.replace("1920", $scope.resolution);

		if($scope.tipoEntitaSelezionata == "stile"){
			$scope.nomeStileSelezionato = entita.nomeStile;
		}
		if($scope.tipoEntitaSelezionata == "borchie"){
			$scope.nomeBorchiaSelezionata = entita.nomeBorchia;
		}
		if ($scope.tipoEntitaSelezionata.startsWith("colore")){
			
			$scope.coloreSelezionato = entita.colore;
			
			//ricarico le iniziali quando cambio il colore
			if($scope.inizialiPreview.length > 0){
				configController.generateArray();
				configController.caricaSpinner();
			}
			if($scope.embossSelezionato){
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss

				var embossUrl = $scope.mapEmboss.get($scope.nomeStileSelezionato + "_" + entita.colore);
				var urlE = embossUrl.urlStripe;
				urlE = urlE.replace("RES", $scope.resolution);
				//urlE = urlE.replace("560", $scope.resolution);
				//urlE = urlE.replace("720", $scope.resolution);
				//urlE = urlE.replace("960", $scope.resolution);
				//urlE = urlE.replace("1920", $scope.resolution);

				if(embossUrl){
					configController.aggiungiElementoAStack(urlE, embossUrl.ordine);
				}
			}
		}
		if ($scope.tipoEntitaSelezionata.startsWith("metalleria")){
			if($scope.tracollaSelezionata){
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss

				var tracollaUrl = $scope.mapMetalloTracolle.get(entita.metallo);
				var urlT = tracollaUrl.urlStripe;
				//urlT = urlT.replace("RES", configController.getResolutionPlaceHolder());
				urlT = urlT.replace("RES", $scope.resolution);
				//urlT = urlT.replace("560", $scope.resolution);
				//urlT = urlT.replace("720", $scope.resolution);
				//urlT = urlT.replace("960", $scope.resolution);
				//urlT = urlT.replace("1920", $scope.resolution);

				if(tracollaUrl){
					configController.aggiungiElementoAStack(urlT, tracollaUrl.ordine, false);
				}
			}
			if($scope.borchieSelezionate){
				//devo sostituire l'emboss se è selezionato
				//1. estraggo la url dell'emboss

				var borchieUrl = $scope.mapMetalloBorchie.get($scope.nomeBorchiaSelezionata + "_" + entita.metallo);
				var urlB = borchieUrl.urlStripe;
				//urlB = urlB.replace("RES", configController.getResolutionPlaceHolder());
				urlB = urlB.replace("RES", $scope.resolution);
				//urlB = urlB.replace("560", $scope.resolution);
				//urlB = urlB.replace("720", $scope.resolution);
				//urlB = urlB.replace("960", $scope.resolution);
				//urlB = urlB.replace("1920", $scope.resolution);

				if(borchieUrl){
					configController.aggiungiElementoAStack(urlB, borchieUrl.ordine, false);
				}
			}
		}

		$scope.removable = false;
		if($scope.scegliColore){
			$scope.coloreVincolante = entita.colore;
		}
		if($scope.scegliMetallo){
			$scope.metalloVincolante = entita.metallo;
		}

		configController.aggiungiStrato(url, entita.ordine, (entita.categoria != "colore" && entita.categoria != "metalleria"));

		if($scope.tipoEntitaSelezionata == "stile"){
			if($scope.stack.indexOf(url) == -1){
				$scope.embossSelezionato = false;
			} else {
				$scope.embossSelezionato = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null)
			}
			$scope.removable = true;
		}

		if($scope.tipoEntitaSelezionata == "borchie"){
			if ($scope.stack.indexOf(url) == -1) {
				$scope.borchieSelezionate = false;
			} else {
				$scope.borchieSelezionate = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null)
			}
			$scope.removable = true;
		}
		if($scope.tipoEntitaSelezionata == "tracolle"){
			if ($scope.stack.indexOf(url) == -1) {
				$scope.tracollaSelezionata = false;
			} else {
				$scope.tracollaSelezionata = ($scope.stack[entita.ordine] != undefined && $scope.stack[entita.ordine] != null)
			}
			$scope.removable = true;
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

	configController.getCutImage = function(imgBase64, frame, resolution){
		
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var image = new Image();
		canvas.height = resolution;
		canvas.width = resolution;
		
		image.src = imgBase64;
		image.onload = function(){
			ctx.drawImage(image, frame * resolution, 0, resolution, resolution, 0 ,0 , resolution, resolution);

			var dataUrl = canvas.toDataURL("image/png");
			// ... or get as Data URI

			$("#pz").attr("src", dataUrl);
			$("#pz").load();
		}
	}
	
	configController.caricaZoom = function(frame){
		var cleanStack = configController.pulisciStack();
		
		if($scope.symbolsUrlStack.length > 0) {
			cleanStack = cleanStack.concat($scope.symbolsUrlStack);
		}
		
		//sostituisco le risoluzioni per avere immagini, nello zoom, piu' definite
		var higherResolutionStack = configController.getHighResolutionStack(cleanStack);
		
		// mergeImages(higherResolutionStack).then(b64 => {
		// 	configController.getCutImage(b64, frame, 960);//valore fisso temporaneo
		// });

		mergeImages(higherResolutionStack).then(b64 => {
			configController.getCutImage(b64, frame, configController.getHigherResolution());
		});
		
	}
	
	//qui avviene la richiesta del modello in base agli accessori selezionati
	configController.caricaSpinner = function(){
		$scope.showZoom = false;
		
		var date1 = new Date();
		$("#loader").show();
		
		configController.setVisible(false);

		//ho ricevuto i dati, attivo lo spinner per la visualizzazione 3D
		var renderType;

		if (isTouchDevice()) {
			renderType = "images"
		} else {
			renderType = "canvas"
		}

		var cleanStack = configController.pulisciStack();
		
		if($scope.symbolsUrlStack.length > 0) {
			cleanStack = cleanStack.concat($scope.symbolsUrlStack);
		}

		var firstExecInit = true;
		var firstExecComplete = true;

		if($('#spritespin') != undefined &&  $('#spritespin').data("spritespin") != undefined){
			$scope.dataUrl = $('#spritespin').data("spritespin").canvas[0].toDataURL();
		}

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
                scrollThreshold   : 200,
                plugins: [
                    'drag',
                    '360'
                ],
                onInit: function(){
					if(firstExecInit){

                		firstExecInit = false;
						$.fn.sepLine('first-divider', 'swiper-container', 'accessori'); // rif. descrizione funzione sepline: custom.js linea 77
						$.fn.yammHeight('navbar-nav', 'yamm-content','riepilogoX'); // rif. descrizione funzione yammHeight: custom.js linea 86
						$(".riepilogo").fadeIn();
						$("#transition-image").show();

                	}
                },
				onComplete: function() {
					if(firstExecComplete){
						firstExecComplete = false;

						if ($scope.spinIcon == true) {
							$("#spinIcon").fadeIn().delay(100).fadeOut();
							$("#spinIcon img").animate({ 'margin-left': '50px'}, 1000);
							//$('#a-middle').animate({opacity:'1'}, 500);
							$('.accessori').animate({opacity:'1'}, 500, function() {});
						}
						$("#transition-image").delay(100).fadeOut();
						$("#loader").delay(200).fadeOut("slow");

						$scope.spinIcon = false;
						$scope.spinAnim = false;
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
				var url = singolaEntita.urlStripe;
				return url.replace("RES", $scope.resolution);
			}
		}
		return "";
	}
	
	configController.getHigherResolution = function(){
		var currentRes = $scope.resolution;
		var higherRes = currentRes;
		switch(currentRes) {
			case "560":
				higherRes = "960";
				break;
			case "720":
				higherRes = "960";
				break;
			case "960":
				//higherRes = "1920";//in attesa che le 1920 siano su S3
				higherRes = "1920";//in attesa che le 1920 siano su S3
				break;
		}
		return higherRes;
	}
	
	configController.getHighResolutionStack = function(currentStack){
		var currentRes = $scope.resolution;
		var higherRes = configController.getHigherResolution();
		
		var higherResolutionStack = [];
		for(var i = 0; i < currentStack.length; i++){
			var element = currentStack[i];
			element = element.replace(currentRes, higherRes);
			higherResolutionStack.push(element);
		}
		return higherResolutionStack;
	}
	
	/*
	 * SEZIONE RELATIVA ALLA GESTIONE DELLE LETTERE E DEI SIMBOLI 
	 * */
	configController.generateSymbolStack = function(){
		//aggiungo la parte delle iniziali - se ce ne sono
		/*
		 * il symbolArray è quello su cui agganciare il modello del 'campo di testo'. Una volta definito quello e dato l'OK
		 * questa funzione si occupa di definire l'array delle url da concatenare a quelle della borsa, andando anche a ragionare
		 * sulle disposizioni dei simboli (sx, msx, m, mdx, dx) dipendentemente dal numero di simboli selezionati
		 * */
		if(configController.areSymbolsSelected()){
			var symbolNumber = configController.getSelectedSymbolNumber();
			if(symbolNumber > 0){
				for(var i=0; i<symbolConfigurations[symbolNumber+1].length; i++){
					var posizione = symbolConfigurations[symbolNumber+1][i];
					//adesso posso comporre lo stack dei simboli
					var url = $scope.baseUrlSymbols 
						+ "INIZIALI" + "_" 
						+ $scope.symbolArray + "_" 
						+ posizione + "_" 
						+ $scope.resolution + "_" 
						+ $scope.coloreSelezionato + ".png";
						//INIZIALI_W_MDX_960_PARROT
					$scope.symbolsUrlStack.push(url);
				}
			}
		}
	}
	configController.modelNameTranslate = function(modelName){
		switch(modelName){
			case "shoulderbag":
				return "RIBALTINA";
			case "shopping":
				return "SHOPPING";
			case "tote":
				return "TOTE";
			case "crossbody":
				return "POCHETTE";
		}
	}
	
	configController.symbolTranslate = function(symbol){
		switch(symbol){
			case "1":
				return "PAPERELLA";
			case "2":
				return "NOTA";
			case "3": 
				return "STELLA";
			default:
				return symbol;
		}
	}
	configController.colorTranslate = function(color){
		switch(color){
		case "black":
			return "NERO";
		case "nude":
			return "NUDE";
		case "parrot": 
			return "PARROT";
		case "oceania": 
			return "OCEANIA";
		case "champagne": 
			return "CHAMPAGNE";
		case "lion": 
			return "LION";
		default:
			return "NERO";
		}
	}
	configController.addSymbol = function(symbol){
		//$scope.symbolArray.push(symbol);
		//configController.checkSelectedSymbols();
		if(symbol == 'backspace'){
			if($scope.inizialiPreview.length > 0){
				$scope.inizialiPreview = $scope.inizialiPreview.slice(0, -1);
				configController.checkSelectedSymbols();
				configController.generateArray();
				configController.caricaSpinner();
			}
		} else {
			$scope.inizialiPreview += symbol;
			configController.checkSelectedSymbols();
			configController.generateArray();
			configController.caricaSpinner();
		}
	}
	
	configController.generateArray = function(){
		$scope.symbolsUrlStack = [];
		var charArray = $scope.inizialiPreview.split('');
		var charArraySize = charArray.length;
		if(charArraySize > 0){
			for(var i=0; i< $scope.symbolConfigurations[charArraySize-1].length; i++){
				var posizione = $scope.symbolConfigurations[charArraySize-1][i];
				//adesso posso comporre lo stack dei simboli
				var translatedSymbol = configController.symbolTranslate(charArray[i]);
				var url = $scope.baseUrlSymbols 
					+ "INIZIALI" + "_" 
					+  translatedSymbol + "_" 
					+ posizione + "_" 
					+ $scope.resolution + "_" 
					+ configController.colorTranslate($scope.coloreSelezionato) + ".png";
				//devo sostituire il nome del modello 
				url = url.replace("MODELLO", configController.modelNameTranslate($scope.modelloSelezionato));
				$scope.symbolsUrlStack.push(url);
			}
		}
	}
	
	configController.checkSelectedSymbols = function(){
		if($scope.inizialiPreview.length > 2){
			configController.disableSymbols();
		} else {
			configController.enableSymbols();
		}
	}
	
	configController.disableSymbols = function(){
		$scope.symbolEnabled = false;
	}
	
	configController.enableSymbols = function(){
		$scope.symbolEnabled = true;
	}
	
	configController.areSymbolsSelected = function(){
		return $scope.symbolArray.length > 0;
	}
	
	configController.getSelectedSymbolNumber = function(){
		return $scope.symbolArray.length;
	}
	
	configController.getSymbolEnabled = function(){
		return $scope.symbolEnabled;
	}
	/*
	 * FINE ---- SEZIONE RELATIVA ALLA GESTIONE DELLE LETTERE E DEI SIMBOLI 
	 * */
	
	configController.ordinaModelli = function(modelliNonOrdinati){

		var size = modelliNonOrdinati.length;
		var tempModelli = new Array(size);

		for(var i = 0; i< size; i++){
			tempModelli[modelliNonOrdinati[i]["ordineInterfaccia"] - 1] = modelliNonOrdinati[i];
		}

		return tempModelli;
	}

	configController.initConfiguratore = function(){

		//1. devo fare il caricamento massivo iniziale delle configurazioni (solo la struttura json dal DB, non le immagini)
		listeService.getModelli().then(function (res) {
			if(res.data.esito.codice == 100){
				$scope.modelli = configController.ordinaModelli(res.data.modelli);

				/* listeService.getAccessori().then(function(res2) {
					$scope.entita = res2.data.accessori;
					//inizializzo la mappa con gli elenchi dei tipi di accessori
					for(var i = 0; i < $scope.modelli.length; i++){
						var modello = $scope.modelli[i];
						$scope.tipiAccessori.set(modello.nome, modello.accessori);
					}
					$(".dropdown-toggle").dropdown("toggle"); //NEW 03/07 - APRO IL TOGGLE DEI MODELLI QUANDO HO EFFETTIVAMENTE CARICATO TUTTI GLI ACCESSORI
				});*/

				$(".dropdown-toggle").dropdown("toggle"); //NEW 03/07 - APRO IL TOGGLE DEI MODELLI QUANDO HO EFFETTIVAMENTE CARICATO TUTTI GLI ACCESSORI
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

		$('#canvasWrapper').parentResize();

		// pulsanti apertura/chiusura zoom borsa
		$('#openZoom').click(function() {
			
			html2canvas(document.querySelector("#spritespin"), { async:false }).then(canvas => {
				$("#loader").show();

				var dataUrl = canvas.toDataURL();
				$("#pz").attr("src", dataUrl);
				$("#pz").load();
				$('.zoom').css({'z-index':'10'}).animate({opacity: '1'});	
				var spriteSpinAPI = $('#spritespin').spritespin('api');
				$("#loader").fadeOut("slow");
				configController.caricaZoom(spriteSpinAPI.currentFrame());//CARICO LO ZOOM AD ALTA RISOLUZIONE
			});
		});
		$('#closeZoom').click(function() {
			$('.zoom').animate({opacity: 0}, {complete: function(){ $(this).css({'z-index': '0'}) }});
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

		$('#a').click(function(){
			var $target = $('#inizialiPreview'),
				text = $('#inizialiPreview').val(),
				buttonVal = $(this).data('value');

			$target.val(text+" "+buttonVal);
		})

		$(document).on('blur', '#txt_fullname', function() {
			var name = $(this).val();
			//alert('Make an AJAX call and pass this parameter >> name=' + name);
			$('#edit-text').text(name);
		});

		$('.accessori').css('bottom', $('.riepilogo').outerHeight());
		$.fn.yammHeight('navbar-nav', 'yamm-content','riepilogoX'); // rif. descrizione funzione yammHeight: custom.js linea 86
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
			$('#canvasWrapper').parentResize();
		    //$('#a-middle').centerElement();
		    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
		    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogoX')
		});

		
	};

});