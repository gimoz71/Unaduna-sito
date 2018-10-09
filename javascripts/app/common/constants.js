angular.module('applicationModule').constant('URLS',{
		get: 'https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet',
		getAccessoriNode : 'https://ig24v3ii6b.execute-api.eu-central-1.amazonaws.com/unaDunaGetAccessori'
	}
).constant('RESPONSE_CODES',{
	okResponse: 100
}).constant('VARIOUS',{
	requestTypeModelli: 'MODELLI',
	requestTypeEntita: 'ENTITA'
});