(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddEmployeeModalController', addEmployeeModal);

    function addEmployeeModal($uibModalInstance, employeesResource, employeeList) {
        var ctrl = this;

        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {prison:1};
        ctrl.fields = [
            {
                type: 'input',
                key: 'first_name',
                templateOptions: {
                    label: 'First Name'
                }
            },
            {
                type: 'input',
                key: 'last_name',
                templateOptions: {
                    label: 'Last Name'
                }
            },
            {
                type: 'input',
                key: 'position',
                templateOptions: {
                    label: 'Position'
                }
            },
            {
                type: 'numInput',
                key: 'security_clearance',
                templateOptions: {
                    label: 'Security Clearance'
                }
            }
        ];

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            employeesResource.save(ctrl.model).$promise.then(function(response) {
                employeeList.push(response.data);
                $uibModalInstance.close();
            });
        }
    }
})();
