(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('ReleasePrisonerModalController', ReleasePrisonerModal);

    function ReleasePrisonerModal($uibModalInstance, prisonersResource, prisonerList, prisoner) {
        var ctrl = this;

        ctrl.ok = submit;
        ctrl.cancel = close;
        ctrl.prisoner = prisoner;

        function submit() {
            prisonersResource.delete({id:prisoner.id}).$promise.then(function(response) {
                for (var i = 0 ; i < prisonerList.length ; i++) {
                    if (prisonerList[i].id == prisoner.id) {
                        prisonerList.splice(i, 1);
                        break;
                    }
                }
                $uibModalInstance.close();
            });
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
