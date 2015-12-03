(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('FireEmployeeModalController', fireEmployeeModal);

    function fireEmployeeModal($uibModalInstance, employeesResource, employeeList, employee) {
        var ctrl = this;

        ctrl.ok = submit;
        ctrl.cancel = close;
        ctrl.employee = employee;

        function submit() {
            employeesResource.delete({id:employee.id}).$promise.then(function(response) {
                for (var i = 0 ; i < employeeList.length ; i++) {
                    if (employeeList[i].id == employee.id) {
                        employeeList.splice(i, 1);
                        break;
                    }
                }
            });
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
