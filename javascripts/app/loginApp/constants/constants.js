angular.module('loginModule').constant('URLS',{
		get: 'https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet',
		put: 'https://i51umjhba2.execute-api.eu-central-1.amazonaws.com/unadunaPost',
		del: 'https://gtjby1j5oi.execute-api.eu-central-1.amazonaws.com/UnadunaDelete',
		getConfigurazioniNode :' https://3swwefa2tj.execute-api.eu-central-1.amazonaws.com/unaDunaGetConfigurazioniNode'
	}
).constant('RESPONSE_CODES',{
	okResponse: 100
}).constant('VARIOUS',{
	requestTypeModelli: 'MODELLI',
	requestTypeEntita: 'ENTITA'
});