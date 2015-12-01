(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddEmployeeModalController', addEmployeeModal);

    function addEmployeeModal($uibModalInstance) {
        var ctrl = this;

        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {};
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
                type: 'input',
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
            $uibModalInstance.close();
        }
    }
})();
