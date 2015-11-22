(function() {
    'use strict';
    angular.module('prisonMaster.employees', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('manageEmployees', {
                    url: '/warden/manage/employees',
                    templateUrl: '/static/angular_client/app/employees/manage.html'
                });
        });
})();
