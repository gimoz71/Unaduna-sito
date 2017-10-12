angular.module("loginModule").controller("loginController", function($rootScope, $scope, AUTH_EVENTS, AuthService, ROLES) {
  
	$scope.currentUser = null;
	$scope.userRoles = ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	
	$scope.loginMessage = {};	
	
	$scope.credentials = {
			username: "",	
			password: ""
	};
  
	$scope.login = function (credentials) {
    
		AuthService.login(credentials).then(function (user) {
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			$scope.currentUser = user;
		}, function () {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		});
	};
})