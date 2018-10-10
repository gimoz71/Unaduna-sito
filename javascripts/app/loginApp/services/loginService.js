angular.module("loginModule").service("loginService", ["$http" , "$q", function($http, $q) {
	
    this.userPool = null;
	this.cognitoUser = null;
	
    this.getUserPool = function(){
    	if (this.userPool == null){
		    var data = { 
					  UserPoolId : 'eu-central-1_a9ioJ2EQ6',
				      ClientId : 'hopaonak9q0cteab10ga0uhoj'
				    };
		    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    	}
		return this.userPool;
    }
    
    this.getCognitoUser = function (){
    	if(this.cognitoUser == null){
    		var userPool = this.getUserPool();
    		this.cognitoUser = userPool.getCurrentUser();
    	}
    	return this.cognitoUser;
    }
    
    this.getSession = function () {
    	 var deferred = $q.defer();
    	 var cognitoUser = this.getCognitoUser();
		 if (cognitoUser != null) {
	         cognitoUser.getSession(function (err, session) {
	             if (err) {
	                 deferred.reject(err);
	            	 alert(err);
	                 return;
	             }
	             deferred.resolve(session);
	         });
	    }else{
	    	deferred.reject("non sei loggato");
	    }
		 return deferred.promise;
    }
    
	this.signUp = function(email, nome, cognome, password){
		var username = nome + "-" + cognome;
		
	    var userPool = this.getUserPool();

	    var attributeList = [];
	    
	    var dataEmail = {
	        Name : 'email',
	        Value : email
	    };
	    /**var dataPhoneNumber = {
	        Name : 'phone_number',
	        Value : '+15555555555'
	    };**/
	    
	    var dataName = {
	    	Name : 'name',
	    	Value : nome
	    }
	    
	    var dataFamilyName = {
    		Name : 'family name',
    		Value : cognome
	    }
	    
	    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	    //var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
	    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
	    var attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
	    
	    attributeList.push(attributeEmail);
	    //attributeList.push(attributePhoneNumber);
	    var deferred = $q.defer();
	    userPool.signUp(username, password, attributeList, null, function(err, result){
	        if (err) {
	            deferred.reject (err);
	            return;
	        }
	        cognitoUser = result.user;
	        console.log('user name is ' + cognitoUser.getUsername());
	        this.cognitoUser = cognitoUser;
	        deferred.resolve (cognitoUser);
	    });
	    return deferred.promise;
	}
	
	this.login = function(email, password){
		var authenticationData = {
		        Username : email,
		        Password : password,
		    };
	    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

	    var userPool = this.getUserPool();
	    var userData = {
	        Username : email,
	        Pool : userPool
	    };
	    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	    var deferred = $q.defer();
	    this.cognitoUser.authenticateUser(authenticationDetails, {
	        onSuccess: function (result) {
	                console.log (result);
	                deferred.resolve (result);
	               
//	                    // Set the region where your identity pool exists (us-east-1, eu-west-1)
//	                AWS.config.region = 'eu-central-1';
//	                // Configure the credentials provider to use your identity pool
//	                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//	                    IdentityPoolId: 'eu-central-1:c51a37d3-18e6-4a2b-83d1-49090b88682f',
//	                    Logins: { // optional tokens, used for authenticated login
//	                        //'graph.facebook.com': 'FBTOKEN',
//	                        'cognito-idp.eu-central-1.amazonaws.com/eu-central-1_4pV2AIRml': idToken
//	                        //'accounts.google.com': 'GOOGLETOKEN'
//	                    }
//	                });
//
//	                AWS.config.credentials.get(function(){
//
//	                    // Credentials will be available when this function is called.
//	                    var accessKeyId = AWS.config.credentials.accessKeyId;
//	                    var secretAccessKey = AWS.config.credentials.secretAccessKey;
//	                    var sessionToken = AWS.config.credentials.sessionToken;
//	                    console.log(sessionToken);
//	                    
////	                    docClient = new AWS.DynamoDB.DocumentClient();
//	                    
//	                });

	            },
	        onFailure: function(err) {
	            console.log(err);
	            deferred.reject (err);
	        },
	    });
	    return deferred.promise;
	}
	
	this.getCurrentUser = function (){
		var deferred = $q.defer();
	    var cognitoUser = this.getCognitoUser();

	    if (cognitoUser != null) {
	        cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	deferred.reject(err);
	               alert(err);
	                return;
	            }
	            deferred.resolve(cognitoUser);
	            console.log(session);
	            console.log('session validity: ' + session.isValid());

//	            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//	                IdentityPoolId : 'eu-central-1:c51a37d3-18e6-4a2b-83d1-49090b88682f',
//	                Logins : {
//	                    // Change the key below according to the specific region your user pool is in.
//	                    'cognito-idp.eu-central-1.amazonaws.com/eu-central-1_4pV2AIRml' : session.getIdToken().getJwtToken()
//	                }
//	            });
//	            deferred.resolve(cognitoUser);
//	            // Instantiate aws sdk service objects now that the credentials have been updated.
//	            // example: var s3 = new AWS.S3();

	        });
	    }
		return deferred.promise;
	}
	
	
	this.logOut = function (){
	    var cognitoUser = this.getCognitoUser();
	    if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
	    cognitoUser.signOut();
	    this.userPool = null;
		this.cognitoUser = null;
	    console.log("logOut");
	}
	
	this.getSession = function (){
	    var deferred = $q.defer();

	    var cognitoUser = this.getCognitoUser();
	   
	    if (cognitoUser != null) {
	    	console.log(cognitoUser);
	        cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	deferred.reject('error');
	            	return deferred.promise;
	            }
	            console.log('session validity: ' + session.isValid());
	            console.log(session);
	            deferred.resolve(session);
	        })
	        
	    }else{
	    	deferred.reject ('non sei loggato');
	          return deferred.promise;
	    }
	    return deferred.promise;
	}
	
	this.forgotPassword = function(){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
	    cognitoUser.forgotPassword({
	        onSuccess: function (result) {
	            console.log('call result: ' + result);
	            deferred.resolve(result);
	        },
	        onFailure: function(err) {
	            alert(err);
	            console.log(err);
	            deferred.reject (err);
	        },
	        inputVerificationCode() {
	            var verificationCode = prompt('Please input verification code ' ,'');
	            var newPassword = prompt('Enter new password ' ,'');
	            cognitoUser.confirmPassword(verificationCode, newPassword, this);
	        }
	    });
	    return deferred.promise;
	}
	
	this.changePassword = function(oldp, newp){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
		cognitoUser.changePassword(oldp, newp, function(err, result) {
	        if (err) {
	            alert(err);
	            console.log(err);
	            deferred.reject (err);
	            return deferred.promise;
	        }
	        deferred.resolve (result);
	        console.log('call result: ' + result);
	    });
		return deferred.promise;
	}
	
	this.deleteUser = function(){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
		cognitoUser.deleteUser(function(err, result) {
	        if (err) {
	            alert(err);
	            console.log(err);
	            deferred.reject (err);
	            return deferred.promise;
	        }
	        console.log('call result: ' + result);
	        deferred.resolve (result);
	    });
		return deferred.promise;
	}
	
	this.getUserAttributes = function (){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
		cognitoUser.getUserAttributes(function(err, result) {
	        if (err) {
	            alert(err);
	            console.log(err);
	            deferred.reject (err);
	            return deferred.promise;
	        }
	        for (i = 0; i < result.length; i++) {
	            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
	        }
	        deferred.resolve (result);
	    });
		return deferred.promise;
	}
	
	this.setDeviceStatusRemembered= function (){
		var userPool = this.getUserPool();
	    var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
		if (cognitoUser != null){
			cognitoUser.setDeviceStatusRemembered({
		        onSuccess: function (result) {
		        	deferred.resolve (result);
		            console.log('call result: ' + result);
		        },
		        onFailure: function(err) {
		        	deferred.reject (err);
		            alert(err);
		            console.log(err);
		        }
		    });
		}else{
			deferred.reject("non connesso");
		}
		return deferred.promise;
	}
	
	this.setDeviceStatusNotRemembered = function(){
	    var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
		if (cognitoUser != null){
			cognitoUser.setDeviceStatusNotRemembered({
		        onSuccess: function (result) {
		        	deferred.resolve (result);
		            console.log('call result: ' + result);
		        },
		    onFailure: function(err) {
		            alert(err);
		            console.log(err);
		            deferred.reject (err);
		        }
		    });
		}else{
			deferred.reject("non connesso");
		}
		return deferred.promise;
	}
	
	this.forgotDevice= function (){
	    var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
	  cognitoUser.forgetDevice({
	        onSuccess: function (result) {
	        	deferred.resolve (result);
	            console.log('call result: ' + result);
	        },
	        onFailure: function(err) {
	        	deferred.reject (err);
	            alert(err);
	            console.log(err);
	        }
	    });
	  return deferred.promise;
	}
	
	this.put  = function (string, value){
		 
	}	
	
	this.get = function (string){
	
	}
}]);