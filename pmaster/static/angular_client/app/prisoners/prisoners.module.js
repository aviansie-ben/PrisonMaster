(function() {
    'use strict';
    angular.module('prisonMaster.prisoners', ['ngAnimate', 'ui.router', 'ui.bootstrap'])
        .config(function($stateProvider) {
            $stateProvider
                .state('managePrisoners', {
                    url: '/warden/manage/prisoners',
                    templateUrl: '/static/angular_client/app/prisoners/managePrisoners.html',
                    controller: 'ManagePrisonersController',
                    controllerAs: 'PrisonersCtrl'
                });
        });
})();
