(function() {
    'use strict';
    angular.module('prisonMaster.employees', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap'])
        .config(function($stateProvider) {
            $stateProvider
                .state('manageEmployees', {
                    url: '/warden/manage/employees',
                    templateUrl: '/static/angular_client/app/employees/manageEmployees.html',
                    controller: 'ManageEmployeesController',
                    controllerAs: 'EmployeesCtrl'
                });
        });
})();
