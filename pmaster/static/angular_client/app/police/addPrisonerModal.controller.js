(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddPrisonerModalController', addPrisonerModal);

    function addPrisonerModal($uibModalInstance) {
        var ctrl = this;

        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {prison: "Alcatraz Maximum Security"};
        ctrl.fields = [
            {
                className: "col-xs-6",
                type: 'input',
                key: 'first_name',
                templateOptions: {
                    label: 'First Name'
                }
            },
            {
                className: "col-xs-6",
                type: 'input',
                key: 'last_name',
                templateOptions: {
                    label: 'Last Name'
                }
            },
            {
                className: "col-xs-6",
                type: 'datepicker',
                key: 'release_date',
                templateOptions: {
                    label: 'Release Date'
                }
            },
            {
                className: "col-xs-6",
                type: 'input',
                key: 'prison',
                templateOptions: {
                    label: 'Prison'
                },
                // force the prison name to be pre-defined
                expressionProperties: {
                    'templateOptions.disabled': 'model.prison'
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
