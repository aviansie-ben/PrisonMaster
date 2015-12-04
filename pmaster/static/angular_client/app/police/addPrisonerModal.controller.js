(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddPrisonerModalController', addPrisonerModal);

    function addPrisonerModal($uibModalInstance, prisonersResource, prison) {
        var ctrl = this;

        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {prison: 1, prisonName: prison.data.name};
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
                key: 'prisonName',
                templateOptions: {
                    label: 'Prison'
                },
                // force the prison name to be pre-defined
                expressionProperties: {
                    'templateOptions.disabled': 'model.prisonName'
                }
            }
        ];

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            delete ctrl.model.prisonName;
            prisonersResource.save(ctrl.model).$promise.then(function(response) {
                $uibModalInstance.close();
            });
        }
    }
})();
