angular.module("loginModule").factory("AuthService", ["$http", "Session", "URLS", "LoginMessagesCreator", "RESPONSE_CODES", function($http, Session, URLS, LoginMessagesCreator, RESPONSE_CODES) {
  
  this.login = function (credentials) {
	  
	//parametri di chiamata
	var data = LoginMessagesCreator.loginMessage(credentials.username, credentials.password);
	
	//configurazioni di chiamata
	var config = {
	      headers : {
	          'Content-Type': 'application/json'
	      }
	  };
		  
    return $http.post(URLS.login, data, config).then(function (res) {
    		var reponseCode = res.data.responseCode;
    		if(reponseCode = RESPONSE_CODES.okResponse){
    			Session.create(res.data.id, res.data.user.id, res.data.user.role);
    			return res.data.user;
    		} else {
    			return res.responseMessage;
    		}
    });
  };
 
  this.isAuthenticated = function () {
    return !!Session.userId;
  };
 
//  this.isAuthorized = function (authorizedRoles) {
//    if (!angular.isArray(authorizedRoles)) {
//      authorizedRoles = [authorizedRoles];
//    }
//    return (this.isAuthenticated() &&
//      authorizedRoles.indexOf(Session.userRole) !== -1);
//  };
 
  return this;
}]);