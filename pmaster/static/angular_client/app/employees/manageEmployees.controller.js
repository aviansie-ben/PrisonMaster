(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('ManageEmployeesController', manageEmployees);

    function manageEmployees($uibModal) {
        var ctrl = this;

        ctrl.openViewCardModal = openViewCardModal;
        ctrl.openFireEmployeeModal = openFireEmployeeModal;
        ctrl.openAddEmployeeModal = openAddEmployeeModal;

        ctrl.employees = [
            {
                first_name: "John",
                last_name: "Doe",
                position: "Cook",
                security_clearance: 2
            },
            {
                first_name: "John",
                last_name: "Foo",
                position: "Guard",
                security_clearance: 4
            },
            {
                first_name: "John",
                last_name: "Wong",
                position: "Janitor",
                security_clearance: 2
            },
            {
                first_name: "John",
                last_name: "Kim",
                position: "Garbage Collector",
                security_clearance: 2
            },
            {
                first_name: "Java",
                last_name: "the Hutt",
                position: "Guard",
                security_clearance: 5
            }
        ];

        function openViewCardModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/viewCardModal.html',
                controller: 'ViewCardModalController',
                controllerAs: "ViewCardModalCtrl"
            });
        }

        function openFireEmployeeModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/fireEmployeeModal.html',
                controller: 'FireEmployeeModalController',
                controllerAs: "FireEmployeeModalCtrl"
            });
        }

        function openAddEmployeeModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/addEmployeeModal.html',
                controller: 'AddEmployeeModalController',
                controllerAs: "AddEmployeeModalCtrl"
            });
        }
    }
})();
