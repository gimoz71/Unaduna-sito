var app = angular.module('applicationModule', ['loginModule', 'configuratorModule'])
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
		 templateUrl: 'homeContent.html'
	 };
}).directive('esperienzaContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'esperienzaContent.html'
	 };
}).directive('contattiContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'homeContent.html'
	 };
}).directive('storesContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'homeContent.html'
	 };
});
