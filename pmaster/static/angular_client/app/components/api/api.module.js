(function() {
    'use strict';
    angular.module('prisonMaster.api', ['ngResource'])
        .config(function($resourceProvider, $stateProvider) {
            // Don't strip trailing slashes from calculated URLs, as they are required by the backend
            $resourceProvider.defaults.stripTrailingSlashes = false;
        });
})();
