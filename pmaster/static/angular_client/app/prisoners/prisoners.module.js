(function() {
    'use strict';
    angular.module('prisonMaster.prisoners', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('managePrisoners', {
                    url: '/warden/manage/prisoners',
                    templateUrl: '/static/angular_client/app/prisoners/manage.html'
                });
        });
})();
