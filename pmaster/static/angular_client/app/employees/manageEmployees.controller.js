(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('ManageEmployeesController', manageEmployees);

    function manageEmployees($uibModal, employees) {
        var ctrl = this;

        ctrl.openViewCardModal = openViewCardModal;
        ctrl.openFireEmployeeModal = openFireEmployeeModal;
        ctrl.openAddEmployeeModal = openAddEmployeeModal;

        ctrl.employees = employees.data;

        function openViewCardModal(ID) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/viewCardModal.html',
                controller: 'ViewCardModalController',
                controllerAs: "ViewCardModalCtrl",
                resolve: {
                    accessCards: function(employeesResource) {
                        return employeesResource.accessCards({id:ID}).$promise;
                    },
                    employeeID: function() {
                        return ID;
                    }
                },
            });
        }

        function openFireEmployeeModal(employee) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/fireEmployeeModal.html',
                controller: 'FireEmployeeModalController',
                controllerAs: "FireEmployeeModalCtrl",
                resolve: {
                    employeeList: function() {
                        return ctrl.employees;
                    },
                    employee: function() {
                        return employee;
                    }
                },
            });
        }

        function openAddEmployeeModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/addEmployeeModal.html',
                controller: 'AddEmployeeModalController',
                controllerAs: "AddEmployeeModalCtrl",
                resolve: {
                    employeeList: function() {
                        return ctrl.employees;
                    }
                },
            });
        }
    }
})();
