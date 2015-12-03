(function() {
    'use strict';
    angular.module('prisonMaster.prison', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('managePrison', {
                    url: '/warden/manage/prison',
                    templateUrl: '/static/angular_client/app/prison/managePrison.html',
                    controller: 'ManagePrisonController',
                    controllerAs: 'PrisonCtrl'
                });
        });
})();
