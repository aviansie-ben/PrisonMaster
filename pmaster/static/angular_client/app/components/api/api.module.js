(function() {
    'use strict';
    angular.module('prisonMaster.api', ['ngResource'])
        .config(function($resourceProvider, $stateProvider) {
            // Don't strip trailing slashes from calculated URLs, as they are required by the backend
            $resourceProvider.defaults.stripTrailingSlashes = false;

            $stateProvider
                .state('testAPI', {
                    url: '/api/test',
                    templateUrl: '/static/angular_client/app/components/api/apiTester.html',
                    controller: 'ApiTesterController',
                    controllerAs: 'ApiCtrl'
                });
        });
})();
