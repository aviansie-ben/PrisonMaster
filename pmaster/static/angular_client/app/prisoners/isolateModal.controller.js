(function() {
    'use strict';
    angular.module('prisonMaster.prisoners').controller('IsolateModalController', isolateModal);

    function isolateModal($uibModalInstance, prisonersResource, prisoner, prisonerOptions) {
        var ctrl = this;

        ctrl.prisoner = prisoner.data;
        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {isolated_prisoners: isolationList()};
        ctrl.fields = [
            {
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
                l.push(ctrl.prisoner.isolated_prisoners[i].id);
            return l;
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            prisonersResource.update({id:ctrl.prisoner.id}, ctrl.model).$promise.then(function(response) {
                $uibModalInstance.close();
            });
        }
    }
})();
