var app = angular.module('applicationModule', ['loginModule', 'configuratorModule', 'ngAnimate', 'ui.swiper'])
.directive('homeContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'homeContent.html'
	 };
}).directive('configuraContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'configuraContent.html'
	 };
}).directive('visioneContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'visioneContent.html'
	 };
}).directive('esperienzaContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'esperienzaContent.html'
	 };
}).directive('contattiContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: ''
	 };
}).directive('storesContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: ''
	 };
}).directive('accessoContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'accesso.html'
	 };
}).directive('preferitiContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'profilo-borse.html'
	 };
}).directive('ordiniContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'ordini-borse.html'
	 };
}).directive('paypalContent', function(){
	 return {
		 restrict: 'E',
		 scope: {
			 customerInfo: '=info'
		    },
		 templateUrl: 'paypalComponent.html'
	 };
});
