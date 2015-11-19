(function() {
    'use strict';
    angular.module('prisonMaster.layout', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/static/angular_client/app/layout/home.html'
                });
        });
})();
