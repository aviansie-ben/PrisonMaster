(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ViewScheduleModalController', viewScheduleModal);

    function viewScheduleModal($uibModalInstance, accessPoint) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.schedules = accessPoint.schedules;
        ctrl.deleteSched = deleteSched;
        ctrl.ok = ok;
        ctrl.cancel = close;

        function deleteSched(i) {
            ctrl.schedules.splice(i, 1);
        }

        function ok() {
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
