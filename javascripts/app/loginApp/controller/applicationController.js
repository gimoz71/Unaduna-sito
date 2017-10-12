angular.module("loginModule").controller("applicationController", function($rootScope, $scope, AUTH_EVENTS, AuthService, ROLES) {
  
	$scope.currentUser = null;
	$scope.userRoles = ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	
	$scope.loginMessage = {};	
	
	$rootScope.on("SetCurrentUser", function(user){
		$scope.currentUser = user;
	});
	
})