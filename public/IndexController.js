var app = angular.module('indexApplication', ['pascalprecht.translate']);

app.config(['$translateProvider', function($translateProvider) {

	$translateProvider.useStaticFilesLoader({
		prefix: '/i18n/locale-',
		suffix: '.json'
	});
	$translateProvider.determinePreferredLanguage();
	$translateProvider.useSanitizeValueStrategy('escape');

}]);

app.controller('IndexController', function ($scope, $http) {
	$scope.setup;
	$scope.code;

	$scope.validateSetup = function () {

		$http.post('/api/validate/setup', undefined, { timeout: 10000 })
			.then(function onSuccess (response) {
				$scope.setup = 'VALID';
				$scope.code = null;
			}, function onError (response) {
				$scope.setup = 'INVALID';

				switch (response.status) {
				case -1:
					$scope.code = 'SERVER_TIMEOUT';
					break;
				default:
					$scope.code = response.data.code;
					break;
				}

			});

	};

});
