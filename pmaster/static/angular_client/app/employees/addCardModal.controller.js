(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddCardModalController', addCardModal);

    function addCardModal($uibModalInstance) {
        var ctrl = this;

        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {};
        ctrl.fields = [
            {
                type: 'datepicker',
                key: 'expiry_date',
                templateOptions: {
                    label: 'Expiry Date'
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
