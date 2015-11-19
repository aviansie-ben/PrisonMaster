(function() {
    'use strict';
    angular.module('prisonMaster', ['prisonMaster.layout', 'ui.router'])
        .config(function($urlRouterProvider) {
            $urlRouterProvider.otherwise('/home'); //eventually this should probably be a 404 page...
        });
})();
