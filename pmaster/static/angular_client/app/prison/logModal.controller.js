(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('LogModalController', logModal);

    function logModal($uibModalInstance, accessPoint) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.logs = accessPoint.access_logs;
        ctrl.deleteLog = deleteLog;
        ctrl.ok = ok;

        function deleteLog(i) {
            ctrl.logs.splice(i, 1);
        }

        function ok() {
            $uibModalInstance.close();
        }
    }
})();
