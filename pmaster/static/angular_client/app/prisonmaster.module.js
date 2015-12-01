(function() {
    'use strict';
    angular.module('prisonMaster', ['prisonMaster.layout', 'prisonMaster.prison', 'prisonMaster.prisoners', 'prisonMaster.employees', 'prisonMaster.api', 'ui.router'])
        .config(function($urlRouterProvider) {
            $urlRouterProvider.otherwise('/home'); //eventually this should probably be a 404 page...
        });
})();
