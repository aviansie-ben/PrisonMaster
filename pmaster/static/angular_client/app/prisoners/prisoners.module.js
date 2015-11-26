(function() {
    'use strict';
    angular.module('prisonMaster.prisoners', ['ui.router', 'ui.bootstrap'])
        .config(function($stateProvider) {
            $stateProvider
                .state('managePrisoners', {
                    url: '/warden/manage/prisoners',
                    templateUrl: '/static/angular_client/app/prisoners/manage.html',
                    controller: 'ManagePrisonersController',
                    controllerAs: "PrisonersCtrl"
                });
        });
})();
