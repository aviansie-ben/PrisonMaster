(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('LogModalController', logModal);

    function logModal($uibModalInstance, accessPoint) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.logs = accessPoint.access_logs;
        ctrl.deleteLog = deleteLog;
        ctrl.ok = submit;
        ctrl.cancel = close;

        function submit() {
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function deleteLog(i) {
            ctrl.logs.splice(i, 1);
        }
    }
})();
