(function() {
    'use strict';
    angular.module('prisonMaster.prisoners').controller('IsolateModalController', isolateModal);

    function isolateModal($uibModalInstance, prisoner, prisonerOptions) {
        var ctrl = this;

        ctrl.prisoner = prisoner;
        ctrl.isolationList = isolationList();
        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {isolated_prisoners: ctrl.isolationList};
        ctrl.fields = [
            {
                //type: 'multiSelect',
                type: 'multiCheckbox',
                key: 'isolated_prisoners',
                templateOptions: {
                    label: 'Isolate From',
                    options: prisonerOptions
                }
            }
        ];

        function isolationList() {
            var l = [];
            for (var i = 0; i < ctrl.prisoner.isolated_prisoners.length; i++)
                l.push(prisoner.isolated_prisoners[i].id);
            return l;
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            $uibModalInstance.close();
        }
    }
})();
