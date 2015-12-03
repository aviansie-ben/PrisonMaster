(function() {
    'use strict';
    angular.module('prisonMaster.employees', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'prisonMaster.layout', 'prisonMaster.api'])
        .config(function($stateProvider) {
            $stateProvider
                .state('manageEmployees', {
                    url: '/warden/manage/employees',
                    templateUrl: '/static/angular_client/app/employees/manageEmployees.html',
                    controller: 'ManageEmployeesController',
                    controllerAs: 'EmployeesCtrl',
                    resolve: {
                        employees: function(employeesResource) {
                            return employeesResource.list().$promise;
                        }
                    },
                });
        });
})();
